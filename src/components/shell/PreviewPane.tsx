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

  return (
    <section className="min-h-0 overflow-auto bg-slate-100 p-6 text-slate-950">
      <div className="mx-auto flex min-h-full max-w-6xl flex-col rounded-2xl border border-slate-300 bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
          <span>Preview</span>
          <span>{project.name}</span>
        </div>

        <div className="mt-3 min-h-[420px] flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {previewState.srcDoc ? (
            <iframe
              className="block h-full min-h-[420px] w-full bg-white"
              srcDoc={previewState.srcDoc}
              title="HiFi preview"
            />
          ) : (
            <div className="flex h-full min-h-[420px] items-center justify-center p-8 text-center">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Preview unavailable</h2>
                <p className="mt-2 max-w-md text-sm text-slate-500">{previewState.error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
