import type { HifiProject, HifiStyleDeclarations } from '../project/types';
import { getNodeClassName } from './serializeHtml';

export function toCssPropertyName(propertyName: string): string {
  return propertyName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function getSerializableDeclarations(declarations: HifiStyleDeclarations): Array<[string, string]> {
  return Object.entries(declarations)
    .filter((entry): entry is [string, string] => {
      const [, value] = entry;

      return value !== undefined && value.trim().length > 0;
    })
    .sort(([propertyA], [propertyB]) => propertyA.localeCompare(propertyB));
}

export function serializeCss(project: HifiProject): string {
  return Object.entries(project.styles)
    .sort(([nodeIdA], [nodeIdB]) => nodeIdA.localeCompare(nodeIdB))
    .map(([, style]) => {
      const declarations = getSerializableDeclarations(style.declarations);

      if (declarations.length === 0) {
        return '';
      }

      const body = declarations
        .map(([propertyName, value]) => `  ${toCssPropertyName(propertyName)}: ${value};`)
        .join('\n');

      return `.${getNodeClassName(style.nodeId)} {\n${body}\n}`;
    })
    .filter((rule) => rule.length > 0)
    .join('\n\n');
}
