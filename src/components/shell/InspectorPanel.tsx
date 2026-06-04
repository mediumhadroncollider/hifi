import { useProjectStore } from '../../store/projectStore';

export function InspectorPanel() {
  const project = useProjectStore((state) => state.project);
  const selectedNodeId = useProjectStore((state) => state.selectedNodeId);
  const selectedNode = selectedNodeId ? project.nodes[selectedNodeId] : null;

  return (
    <aside className="min-h-0 overflow-y-auto border-l border-slate-800 bg-slate-900/80 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Inspector</h2>
      {selectedNode ? (
        <dl className="mt-3 space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</dt>
            <dd className="mt-1 text-slate-100">{selectedNode.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tag</dt>
            <dd className="mt-1 font-mono text-slate-100">{selectedNode.tag}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">ID</dt>
            <dd className="mt-1 break-all font-mono text-slate-100">{selectedNode.id}</dd>
          </div>
          {selectedNode.text !== undefined ? (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Text</dt>
              <dd className="mt-1 whitespace-pre-wrap text-slate-100">{selectedNode.text}</dd>
            </div>
          ) : null}
        </dl>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-500">
          No element selected
        </div>
      )}
    </aside>
  );
}
