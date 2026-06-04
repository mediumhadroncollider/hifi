export const PREVIEW_NODE_SELECTED_MESSAGE_TYPE = 'hifi:preview-node-selected';

export interface PreviewNodeSelectedMessage {
  type: typeof PREVIEW_NODE_SELECTED_MESSAGE_TYPE;
  nodeId: string;
}
