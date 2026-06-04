import { useMemo } from 'react';
import { serializeDocument } from '../../renderer';
import { useProjectStore } from '../../store/projectStore';

export function PreviewPane() {
  const project = useProjectStore((state) => state.project);

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
        srcDoc: serializeDocument(project),
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'The preview document could not be serialized.',
        srcDoc: null,
      };
    }
  }, [project]);

  return (
    <section className="h-full min-h-0 min-w-0 overflow-hidden bg-white text-slate-950">
      {previewState.srcDoc ? (
        <iframe
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
