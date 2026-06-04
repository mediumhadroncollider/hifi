export function PreviewPane() {
  return (
    <section className="min-h-0 overflow-auto bg-slate-100 p-8 text-slate-950">
      <div className="mx-auto flex min-h-full max-w-5xl items-center justify-center rounded-2xl border border-slate-300 bg-white shadow-sm">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Preview</h2>
          <p className="mt-2 text-sm text-slate-500">Preview renderer will be implemented in E4/T4.</p>
          <p className="mt-4 text-xs text-slate-400">HTML/CSS serializer is ready for the next preview milestone.</p>
        </div>
      </div>
    </section>
  );
}
