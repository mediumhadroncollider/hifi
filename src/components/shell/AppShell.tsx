import { InspectorPanel } from './InspectorPanel';
import { LeftSidebar } from './LeftSidebar';
import { PreviewPane } from './PreviewPane';
import { TopBar } from './TopBar';

export function AppShell() {
  return (
    <div className="flex h-screen min-h-0 flex-col overflow-hidden bg-slate-950 text-slate-100">
      <TopBar />
      <main className="grid min-h-0 flex-1 grid-cols-[280px_minmax(0,1fr)_320px] border-t border-slate-800">
        <LeftSidebar />
        <PreviewPane />
        <InspectorPanel />
      </main>
    </div>
  );
}
