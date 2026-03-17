import MarkdownIt from "markdown-it";

/**
 * Shared markdown-it instance with HTML disabled to prevent XSS.
 * All components that render markdown should use this instead of
 * creating their own MarkdownIt instance.
 */
const md = new MarkdownIt({ html: false, breaks: true, linkify: true });

export default md;
