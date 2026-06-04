import type { HifiProject } from '../project/types';
import { serializeCss } from './serializeCss';
import { serializeHtml } from './serializeHtml';

// CSS is raw text in a <style> element, so an authored </style> sequence
// must not be allowed to terminate the element early.
export function escapeCssForHtmlStyleElement(css: string): string {
  return css.replace(/<\/style/gi, (closingTagStart) => `<\\/${closingTagStart.slice(2)}`);
}

export interface SerializeDocumentOptions {
  /** Trusted HTML appended just before the closing body tag. */
  bodyEndHtml?: string;
}

const PREVIEW_RESET_CSS = `*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
}`;

export function serializeDocument(project: HifiProject, options: SerializeDocumentOptions = {}): string {
  const css = [PREVIEW_RESET_CSS, serializeCss(project)].filter((chunk) => chunk.length > 0).join('\n\n');
  const html = serializeHtml(project);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
${escapeCssForHtmlStyleElement(css)}
    </style>
  </head>
  <body>
${html}${options.bodyEndHtml ? `
${options.bodyEndHtml}` : ''}
  </body>
</html>`;
}
