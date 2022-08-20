import { escapeHtml } from './escape-html';

const isExtendedText = (node) => {
  if (!node) return false;
  return Object.prototype.hasOwnProperty.call(node, 'text');
};

export function serialize(children) {
  if (!children) return null;
  if (Array.isArray(children)) {
    return children
      .map((node, i) => {
        if (isExtendedText(node)) {
          let text = `${escapeHtml(node.text)}`;

          if (node.bold) {
            text = `<strong>${text}</strong>`;
          }

          if (node.code) {
            text = `<code>${text}</code>`;
          }

          if (node.italic) {
            text = `<em>${text}</em>`;
          }

          // Handle other leaf types here...

          return text;
        }

        if (!node) {
          return null;
        }

        if (
          node.type &&
          ['h1', 'h2', 'h3', 'ol', 'ul', 'li'].includes(node.type)
        )
          return `<${node.type}>${serialize(node.children)}</${node.type}>`;

        switch (node.type) {
          case 'quote':
            return `<blockquote>${serialize(node.children)}</blockquote>`;
          case 'ul':
            return `<ul>${serialize(node.children)}</ul>`;
          case 'ol':
            return `<ol>${serialize(node.children)}</ol>`;
          case 'li':
            return `<li>${serialize(node.children)}</li>`;
          case 'link':
            return `<a href=${escapeHtml(node.url)}>${serialize(
              node.children
            )}</a>`;

          default:
            return `<p>${serialize(node.children)}</p>`;
        }
      })
      .join('');
  }
}
