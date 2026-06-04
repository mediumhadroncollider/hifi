import type { HifiNodeTag, HifiProject } from './types';

const containerTags = new Set<HifiNodeTag>(['main', 'section', 'div']);

export function isContainerNodeTag(tag: HifiNodeTag): boolean {
  return containerTags.has(tag);
}

export function findParentNodeId(project: HifiProject, nodeId: string): string | null {
  for (const node of Object.values(project.nodes)) {
    if (node.children.includes(nodeId)) {
      return node.id;
    }
  }

  return null;
}
