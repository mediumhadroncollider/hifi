import { useMemo } from 'react';
import { serializeDocument } from '../../renderer';
import { useProjectStore } from '../../store/projectStore';

export function PreviewPane() {
  const project = useProjectStore((state) => state.project);

  const previewState = useMemo(() => {
    if (!project.rootNodeId || !project.nodes[project.rootNodeId]) {
      return {
        error: 'Preview is unavailable because the project does not contain a renderable root node.',
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

  if (!previewState.srcDoc) {
    return (
      <section className="flex h-full min-h-0 items-center justify-center bg-white text-slate-950">
        <div className="max-w-md text-center">
          <h2 className="text-sm font-semibold text-slate-900">Document preview unavailable</h2>
          <p className="mt-2 text-sm text-slate-500">{previewState.error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="h-full min-h-0 overflow-hidden bg-white">
      <iframe
        className="block h-full w-full border-0 bg-white"
        srcDoc={previewState.srcDoc}
        title="HiFi preview"
      />
    </section>
  );
}
