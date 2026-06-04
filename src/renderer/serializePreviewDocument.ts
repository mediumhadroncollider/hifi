import type { HifiProject } from '../project/types';
import { PREVIEW_NODE_SELECTED_MESSAGE_TYPE } from './previewMessages';
import { serializeDocument } from './serializeDocument';

// JavaScript is raw text in a <script> element, so an authored </script>
// sequence must not be allowed to terminate the element early.
export function escapeJavaScriptForHtmlScriptElement(javaScript: string): string {
  return javaScript.replace(/<\/script/gi, (closingTagStart) => `<\\/${closingTagStart.slice(2)}`);
}

function serializePreviewRuntime(): string {
  return `(() => {
  const MESSAGE_TYPE = ${JSON.stringify(PREVIEW_NODE_SELECTED_MESSAGE_TYPE)};

  function getClosestHifiNode(target) {
    if (target instanceof Element) {
      return target.closest('[data-hifi-id]');
    }

    if (target instanceof Node && target.parentElement) {
      return target.parentElement.closest('[data-hifi-id]');
    }

    return null;
  }

  document.addEventListener(
    'click',
    (event) => {
      const nodeElement = getClosestHifiNode(event.target);

      if (!nodeElement) {
        return;
      }

      const nodeId = nodeElement.getAttribute('data-hifi-id');

      if (!nodeId) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      window.parent.postMessage({ type: MESSAGE_TYPE, nodeId }, '*');
    },
    true,
  );
})();`;
}

export function serializePreviewDocument(project: HifiProject): string {
  const runtimeScript = escapeJavaScriptForHtmlScriptElement(serializePreviewRuntime());
  const scriptMarkup = `    <script>
${runtimeScript}
    </script>`;
  const documentHtml = serializeDocument(project);

  if (documentHtml.includes('\n  </body>')) {
    return documentHtml.replace('\n  </body>', `\n${scriptMarkup}\n  </body>`);
  }

  return `${documentHtml}\n${scriptMarkup}`;
}
