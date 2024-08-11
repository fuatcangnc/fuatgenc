import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

export async function sanitizeContent(content: string): Promise<string> {
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(content);
}