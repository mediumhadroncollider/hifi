import { create } from 'zustand';
import { createDefaultProject } from '../project/defaultProject';
import type { HifiProject, HifiStyleDeclarations } from '../project/types';

interface ProjectStoreState {
  project: HifiProject;
  selectedNodeId: string | null;
  selectNode: (nodeId: string) => void;
  updateNodeText: (nodeId: string, text: string) => void;
  updateNodeStyle: (nodeId: string, declarations: HifiStyleDeclarations) => void;
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  project: createDefaultProject(),
  selectedNodeId: null,
  selectNode: (nodeId) => {
    set(({ project }) => ({
      selectedNodeId: project.nodes[nodeId] ? nodeId : null,
    }));
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
