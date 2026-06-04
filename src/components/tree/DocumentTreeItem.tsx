import type { ReactNode } from 'react';
import type { HifiNode } from '../../project/types';

interface DocumentTreeItemProps {
  node: HifiNode;
  depth: number;
  isSelected: boolean;
  childItems: ReactNode;
  onSelect: (nodeId: string) => void;
}

export function DocumentTreeItem({ node, depth, isSelected, childItems, onSelect }: DocumentTreeItemProps) {
  return (
    <li>
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
          isSelected
            ? 'bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/40'
            : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
        }`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={() => onSelect(node.id)}
      >
        <span className="min-w-0 truncate font-medium">{node.name}</span>
        <span className="shrink-0 rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-400">
          {node.tag}
        </span>
      </button>
      {childItems}
    </li>
  );
}
