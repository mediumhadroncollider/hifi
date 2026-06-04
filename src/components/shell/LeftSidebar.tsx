import { DocumentTree } from '../tree/DocumentTree';

export function LeftSidebar() {
  return (
    <aside className="min-h-0 overflow-y-auto border-r border-slate-800 bg-slate-900/80">
      <section className="border-b border-slate-800 p-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Blocks</h2>
        <div className="mt-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-500">
          Building blocks will appear here.
        </div>
      </section>
      <section className="p-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Document tree</h2>
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/60 p-2">
          <DocumentTree />
        </div>
      </section>
    </aside>
  );
}
