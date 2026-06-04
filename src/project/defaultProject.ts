import type { HifiProject } from './types';

export function createDefaultProject(): HifiProject {
  return {
    id: 'project-default',
    name: 'HiFi starter project',
    rootNodeId: 'node-root',
    nodes: {
      'node-root': {
        id: 'node-root',
        tag: 'main',
        name: 'Main page',
        children: ['node-hero'],
      },
      'node-hero': {
        id: 'node-hero',
        tag: 'section',
        name: 'Hero section',
        children: ['node-hero-title', 'node-hero-copy', 'node-hero-cta'],
      },
      'node-hero-title': {
        id: 'node-hero-title',
        tag: 'h1',
        name: 'Hero heading',
        text: 'Design crisp web prototypes without leaving the DOM.',
        children: [],
      },
      'node-hero-copy': {
        id: 'node-hero-copy',
        tag: 'p',
        name: 'Hero paragraph',
        text: 'HiFi keeps the document model neutral, serializable, and ready for real HTML and CSS output.',
        children: [],
      },
      'node-hero-cta': {
        id: 'node-hero-cta',
        tag: 'button',
        name: 'Primary action',
        text: 'Start prototyping',
        children: [],
      },
    },
    styles: {
      'node-root': {
        nodeId: 'node-root',
        declarations: {
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          padding: '48px',
        },
      },
      'node-hero': {
        nodeId: 'node-hero',
        declarations: {
          backgroundColor: '#ffffff',
          padding: '64px',
          textAlign: 'center',
        },
      },
      'node-hero-title': {
        nodeId: 'node-hero-title',
        declarations: {
          fontSize: '48px',
          fontWeight: '700',
          lineHeight: '1.1',
          margin: '0 0 16px',
        },
      },
      'node-hero-copy': {
        nodeId: 'node-hero-copy',
        declarations: {
          color: '#475569',
          fontSize: '18px',
          lineHeight: '1.6',
          margin: '0 0 24px',
        },
      },
      'node-hero-cta': {
        nodeId: 'node-hero-cta',
        declarations: {
          backgroundColor: '#2563eb',
          color: '#ffffff',
          fontWeight: '600',
          padding: '12px 18px',
        },
      },
    },
    googleFonts: [],
  };
}
