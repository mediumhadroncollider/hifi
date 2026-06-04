import type { HifiNode, HifiProject } from '../project/types';

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function getNodeClassName(nodeId: string): string {
  const safeId = nodeId
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `hifi-node-${safeId || 'node'}`;
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
