export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-5">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-400 font-bold text-slate-950">
          H
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-white">HiFi</h1>
          <p className="text-xs text-slate-400">DOM-first visual prototyping editor</p>
        </div>
      </div>
      <div className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
        Editor shell
      </div>
    </header>
  );
}
