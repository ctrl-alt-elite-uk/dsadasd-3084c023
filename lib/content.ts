import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Reads a markdown file from content/ at build time and returns its frontmatter
// + body. All content is loaded server-side during SSG; nothing ships to the
// client except the rendered HTML.

const CONTENT_DIR = path.join(process.cwd(), "content");

export type MarkdownDoc<TData = Record<string, unknown>> = {
  data: TData;
  body: string;
};

export function readDoc<TData = Record<string, unknown>>(
  slug: string
): MarkdownDoc<TData> {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return { data: data as TData, body: content };
}

// Ultra-minimal markdown -> HTML for body prose. We avoid a full MDX pipeline
// to keep the template light and the build fast. Supported:
//   - paragraphs separated by blank lines
//   - `# heading` / `## heading` / `### heading`
//   - unordered lists with `- ` prefix
//   - inline `**bold**` and `_italic_`
// Anything fancier belongs in structured frontmatter.
export function renderMarkdown(body: string): string {
  const lines = body.split("\n");
  const out: string[] = [];
  let inList = false;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    out.push(`<p>${inline(paragraph.join(" ").trim())}</p>`);
    paragraph = [];
  };
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") {
      flushParagraph();
      closeList();
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushParagraph();
      closeList();
      out.push(`<h3>${inline(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      closeList();
      out.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith("# ")) {
      flushParagraph();
      closeList();
      out.push(`<h1>${inline(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(trimmed.slice(2))}</li>`);
      continue;
    }
    paragraph.push(trimmed);
  }
  flushParagraph();
  closeList();
  return out.join("\n");
}

function inline(text: string): string {
  // Escape then apply the minimal inline rules. Order matters: escape first
  // so user content can't inject HTML, then re-apply our own tags.
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>");
}
