import { useEffect, useMemo, useRef } from 'react';
import { PREVIEW_NODE_SELECTED_MESSAGE_TYPE, serializePreviewDocument } from '../../renderer';
import type { PreviewNodeSelectedMessage } from '../../renderer';
import { useProjectStore } from '../../store/projectStore';

export function PreviewPane() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const project = useProjectStore((state) => state.project);
  const selectNode = useProjectStore((state) => state.selectNode);

  const previewState = useMemo(() => {
    if (!project.rootNodeId || !project.nodes[project.rootNodeId]) {
      return {
        error: 'The document cannot be rendered because the project does not contain a renderable root node.',
        srcDoc: null,
      };
    }

    try {
      return {
        error: null,
        srcDoc: serializePreviewDocument(project),
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'The preview document could not be serialized.',
        srcDoc: null,
      };
    }
  }, [project]);

  useEffect(() => {
    function isPreviewNodeSelectedMessage(data: unknown): data is PreviewNodeSelectedMessage {
      return (
        typeof data === 'object' &&
        data !== null &&
        'type' in data &&
        data.type === PREVIEW_NODE_SELECTED_MESSAGE_TYPE &&
        'nodeId' in data &&
        typeof data.nodeId === 'string'
      );
    }

    function handleMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow) {
        return;
      }

      if (!isPreviewNodeSelectedMessage(event.data)) {
        return;
      }

      if (!project.nodes[event.data.nodeId]) {
        return;
      }

      selectNode(event.data.nodeId);
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [project.nodes, selectNode]);

  return (
    <section className="h-full min-h-0 min-w-0 overflow-hidden bg-white text-slate-950">
      {previewState.srcDoc ? (
        <iframe
          ref={iframeRef}
          className="block h-full w-full border-0 bg-white"
          srcDoc={previewState.srcDoc}
          title="HiFi preview"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-center">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Document unavailable</h2>
            <p className="mt-2 max-w-md text-sm text-slate-500">{previewState.error}</p>
          </div>
        </div>
      )}
    </section>
  );
}
