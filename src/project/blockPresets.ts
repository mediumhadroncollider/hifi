import type { HifiNodeTag, HifiStyleDeclarations } from './types';

export type HifiBlockType = 'section' | 'div' | 'heading-1' | 'heading-2' | 'paragraph' | 'button';

export interface HifiBlockPreset {
  type: HifiBlockType;
  label: string;
  tag: HifiNodeTag;
  name: string;
  text?: string;
  styles: HifiStyleDeclarations;
}

export const blockPresets: Record<HifiBlockType, HifiBlockPreset> = {
  section: {
    type: 'section',
    label: 'Section',
    tag: 'section',
    name: 'Section',
    styles: {
      padding: '48px',
      margin: '0',
    },
  },
  div: {
    type: 'div',
    label: 'Div / Block',
    tag: 'div',
    name: 'Div / Block',
    styles: {
      padding: '24px',
    },
  },
  'heading-1': {
    type: 'heading-1',
    label: 'Heading H1',
    tag: 'h1',
    name: 'Heading H1',
    text: 'New heading',
    styles: {
      fontSize: '48px',
      fontWeight: '700',
      lineHeight: '1.1',
      margin: '0 0 16px',
    },
  },
  'heading-2': {
    type: 'heading-2',
    label: 'Heading H2',
    tag: 'h2',
    name: 'Heading H2',
    text: 'New subheading',
    styles: {
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '1.2',
      margin: '0 0 12px',
    },
  },
  paragraph: {
    type: 'paragraph',
    label: 'Paragraph',
    tag: 'p',
    name: 'Paragraph',
    text: 'New paragraph',
    styles: {
      fontSize: '16px',
      lineHeight: '1.6',
      margin: '0 0 16px',
    },
  },
  button: {
    type: 'button',
    label: 'Button',
    tag: 'button',
    name: 'Button',
    text: 'Button',
    styles: {
      fontSize: '16px',
      fontWeight: '600',
      padding: '12px 20px',
      margin: '0',
    },
  },
};

export const blockPresetList: HifiBlockPreset[] = [
  blockPresets.section,
  blockPresets.div,
  blockPresets['heading-1'],
  blockPresets['heading-2'],
  blockPresets.paragraph,
  blockPresets.button,
];
