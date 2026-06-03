export function InspectorPanel() {
  return (
    <aside className="min-h-0 overflow-y-auto border-l border-slate-800 bg-slate-900/80 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Inspector</h2>
      <div className="mt-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-500">
        No element selected
      </div>
    </aside>
  );
}
