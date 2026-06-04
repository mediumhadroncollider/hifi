export type HifiNodeTag = 'main' | 'section' | 'div' | 'h1' | 'h2' | 'p' | 'button';

export type HifiStyleDeclarationName =
  | 'backgroundColor'
  | 'color'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'fontStyle'
  | 'textAlign'
  | 'lineHeight'
  | 'padding'
  | 'margin';

export type HifiStyleDeclarations = Partial<Record<HifiStyleDeclarationName, string>>;

export interface HifiNode {
  id: string;
  tag: HifiNodeTag;
  name: string;
  text?: string;
  children: string[];
}

export interface HifiStyle {
  nodeId: string;
  declarations: HifiStyleDeclarations;
}

export interface HifiProject {
  id: string;
  name: string;
  rootNodeId: string;
  nodes: Record<string, HifiNode>;
  styles: Record<string, HifiStyle>;
  googleFonts: string[];
}
