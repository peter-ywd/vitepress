
import { createContentLoader } from 'vitepress'
export default createContentLoader("interview/*.md", {
  includeSrc: true,
  transform(raw) {
    console.log(raw)
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        date: frontmatter.date,
      }))
      .sort((a, b) => b.date.time - a.date.time);
  },
});
