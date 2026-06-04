import { create } from 'zustand';
import { blockPresets } from '../project/blockPresets';
import type { HifiBlockType } from '../project/blockPresets';
import { createDefaultProject } from '../project/defaultProject';
import { findParentNodeId, isContainerNodeTag } from '../project/treeUtils';
import type { HifiNode, HifiProject, HifiStyleDeclarations } from '../project/types';

interface ProjectStoreState {
  project: HifiProject;
  selectedNodeId: string | null;
  selectNode: (nodeId: string) => void;
  addBlock: (blockType: HifiBlockType) => void;
  updateNodeText: (nodeId: string, text: string) => void;
  updateNodeStyle: (nodeId: string, declarations: HifiStyleDeclarations) => void;
}

function createNodeId(project: HifiProject): string {
  const randomId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : null;
  const baseId = randomId ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  let nodeId = `node-${baseId}`;
  let index = 1;

  while (project.nodes[nodeId]) {
    nodeId = `node-${baseId}-${index}`;
    index += 1;
  }

  return nodeId;
}

function getInsertionTarget(project: HifiProject, selectedNodeId: string | null): { parentId: string; insertAfterId: string | null } {
  const rootNodeId = project.rootNodeId;

  if (!selectedNodeId) {
    return { parentId: rootNodeId, insertAfterId: null };
  }

  const selectedNode = project.nodes[selectedNodeId];

  if (!selectedNode) {
    return { parentId: rootNodeId, insertAfterId: null };
  }

  if (isContainerNodeTag(selectedNode.tag)) {
    return { parentId: selectedNode.id, insertAfterId: null };
  }

  const selectedParentId = findParentNodeId(project, selectedNode.id) ?? rootNodeId;

  return { parentId: selectedParentId, insertAfterId: selectedNode.id };
}

function insertChildId(children: string[], childId: string, insertAfterId: string | null): string[] {
  if (!insertAfterId) {
    return [...children, childId];
  }

  const selectedIndex = children.indexOf(insertAfterId);

  if (selectedIndex === -1) {
    return [...children, childId];
  }

  return [...children.slice(0, selectedIndex + 1), childId, ...children.slice(selectedIndex + 1)];
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  project: createDefaultProject(),
  selectedNodeId: null,
  selectNode: (nodeId) => {
    set(({ project }) => ({
      selectedNodeId: project.nodes[nodeId] ? nodeId : null,
    }));
  },
  addBlock: (blockType) => {
    set(({ project, selectedNodeId }) => {
      const preset = blockPresets[blockType];
      const nodeId = createNodeId(project);
      const newNode: HifiNode = {
        id: nodeId,
        tag: preset.tag,
        name: preset.name,
        children: [],
        ...(preset.text !== undefined ? { text: preset.text } : {}),
      };
      const { parentId, insertAfterId } = getInsertionTarget(project, selectedNodeId);
      const parentNode = project.nodes[parentId] ?? project.nodes[project.rootNodeId];

      if (!parentNode) {
        return {};
      }

      return {
        selectedNodeId: nodeId,
        project: {
          ...project,
          nodes: {
            ...project.nodes,
            [parentNode.id]: {
              ...parentNode,
              children: insertChildId(parentNode.children, nodeId, insertAfterId),
            },
            [nodeId]: newNode,
          },
          styles: {
            ...project.styles,
            [nodeId]: {
              nodeId,
              declarations: { ...preset.styles },
            },
          },
        },
      };
    });
  },
  updateNodeText: (nodeId, text) => {
    set(({ project }) => {
      const node = project.nodes[nodeId];

      if (!node) {
        return {};
      }

      return {
        project: {
          ...project,
          nodes: {
            ...project.nodes,
            [nodeId]: {
              ...node,
              text,
            },
          },
        },
      };
    });
  },
  updateNodeStyle: (nodeId, declarations) => {
    set(({ project }) => {
      const node = project.nodes[nodeId];

      if (!node) {
        return {};
      }

      const style = project.styles[nodeId] ?? { nodeId, declarations: {} };

      return {
        project: {
          ...project,
          styles: {
            ...project.styles,
            [nodeId]: {
              ...style,
              declarations: {
                ...style.declarations,
                ...declarations,
              },
            },
          },
        },
      };
    });
  },
}));
