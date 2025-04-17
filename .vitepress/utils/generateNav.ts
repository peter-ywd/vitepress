import fs from "fs";
import path from "path";
// 生成 index.md 文件内容

import { createContentLoader } from "vitepress";
function fetchPostData(dirPath) {
  return createContentLoader(`${dirPath}/*.md`, {
    // includeSrc: true, // 包含原始 markdown 源?
    // render: true,     // 包含渲染的整页 HTML?
    // excerpt: true,    // 包含摘录?
    transform(raw) {
      return raw
        .map(({ url, frontmatter, excerpt }) => ({
          ...frontmatter,
          title: frontmatter.title || path.basename(url, ".html"),
          url,
          excerpt,
          date: formattedDate(frontmatter.datetime),
          lastUpdated: frontmatter.datetime || new Date("2023-12-01"),
        }))
        .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
    },
  });
}
export async function generateIndexMd(dirPath) {
  const posts = (await fetchPostData(dirPath).load()).filter((item) => item.title !== dirPath);
  let content = ``; // index.md 文件的头部
  const dateObj = {};
  posts.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
    .forEach((post) => {
      if (!dateObj[post.date]) dateObj[post.date] = [post];
      else dateObj[post.date].push(post);
    });
  for (const key in dateObj) {
    if (dateObj[key]) {
        content += `::: timeline ${key}\n`;
        dateObj[key].forEach(post => {
        content += `- <a href="${post.permalink || post.url}">${post.title}</a>\n`;
      });
      content += `::: \n`;
    }
  }

  // 将生成的内容写入到 index.md 文件
  fs.writeFileSync(path.resolve(dirPath, "index.md"), content, "utf8");
  return posts
}

function formattedDate(date) {
  let dateValue = new Date(date);
  // 格式化日期
  return dateValue.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
