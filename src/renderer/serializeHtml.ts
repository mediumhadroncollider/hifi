import type { HifiNode, HifiProject } from '../project/types';

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function encodeNodeIdForClassName(nodeId: string): string {
  if (nodeId.length === 0) {
    return 'empty';
  }

  const encodedCodeUnits: string[] = [];

  for (let index = 0; index < nodeId.length; index += 1) {
    encodedCodeUnits.push(nodeId.charCodeAt(index).toString(16).padStart(4, '0'));
  }

  return `u${encodedCodeUnits.join('-u')}`;
}

export function getNodeClassName(nodeId: string): string {
  return `hifi-node-${encodeNodeIdForClassName(nodeId)}`;
}

function renderNodeChildren(project: HifiProject, node: HifiNode, depth: number): string[] {
  const childMarkup = node.children
    .map((childId) => renderNode(project, childId, depth + 1))
    .filter((markup) => markup.length > 0);

  if (node.text === undefined || node.text.length === 0) {
    return childMarkup;
  }

  return [`${'  '.repeat(depth + 1)}${escapeHtml(node.text)}`, ...childMarkup];
}

export function renderNode(project: HifiProject, nodeId: string, depth = 0): string {
  const node = project.nodes[nodeId];

  if (!node) {
    return '';
  }

  const indent = '  '.repeat(depth);
  const tag = node.tag;
  const attributes = `data-hifi-id="${escapeHtml(node.id)}" class="${getNodeClassName(node.id)}"`;
  const children = renderNodeChildren(project, node, depth);

  if (children.length === 0) {
    return `${indent}<${tag} ${attributes}></${tag}>`;
  }

  return [`${indent}<${tag} ${attributes}>`, ...children, `${indent}</${tag}>`].join('\n');
}

export function serializeHtml(project: HifiProject): string {
  return renderNode(project, project.rootNodeId);
}
