import type { ReactNode } from 'react';
import { useProjectStore } from '../../store/projectStore';
import { DocumentTreeItem } from './DocumentTreeItem';

export function DocumentTree() {
  const project = useProjectStore((state) => state.project);
  const selectedNodeId = useProjectStore((state) => state.selectedNodeId);
  const selectNode = useProjectStore((state) => state.selectNode);

  const renderNode = (nodeId: string, depth = 0): ReactNode => {
    const node = project.nodes[nodeId];

    if (!node) {
      return null;
    }

    const childItems = node.children.length > 0 ? (
      <ul className="mt-1 space-y-1">{node.children.map((childId) => renderNode(childId, depth + 1))}</ul>
    ) : null;

    return (
      <DocumentTreeItem
        key={node.id}
        node={node}
        depth={depth}
        isSelected={node.id === selectedNodeId}
        childItems={childItems}
        onSelect={selectNode}
      />
    );
  };

  return <ul className="space-y-1">{renderNode(project.rootNodeId)}</ul>;
}
