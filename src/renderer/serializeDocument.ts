import type { HifiProject } from '../project/types';
import { serializeCss } from './serializeCss';
import { serializeHtml } from './serializeHtml';

const PREVIEW_RESET_CSS = `*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
}`;

export function serializeDocument(project: HifiProject): string {
  const css = [PREVIEW_RESET_CSS, serializeCss(project)].filter((chunk) => chunk.length > 0).join('\n\n');
  const html = serializeHtml(project);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
${css}
    </style>
  </head>
  <body>
${html}
  </body>
</html>`;
}
