
import path from 'path';
import { createContentLoader } from 'vitepress'
export default createContentLoader("interview/*.md", {
  // includeSrc: true, // 包含原始 markdown 源?
  // render: true,     // 包含渲染的整页 HTML?
  // excerpt: true,    // 包含摘录?
  transform(raw) {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || path.basename(url, '.html'),
        url,
        excerpt,
        date: frontmatter.lastUpdated || '1970-01-01',
      }))
      .sort((a, b) => b.date.time - a.date.time);
  },
});
