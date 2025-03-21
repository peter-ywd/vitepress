import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: "vitepress blog",
  description: "vitepress blog",
  base: '/vitepress/',
  ignoreDeadLinks: true,
  giscus: {
    repo: 'peter-ywd/vitepress',
    repoId: 'R_kgDOOMP-Wg',
    category: 'General',
    categoryId: 'DIC_kwDOOMP',
    mapping: 'pathname',
    reactionsEnabled: true,
    theme: 'preferred_color_scheme'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "前端面试题w", link: "/docs-1/test2" },
      { text: "面试题", link: "/docs-2/wqwqw/TEST-Router" },
    ],

    // sidebar: 'auto',

    socialLinks: [{ icon: "github", link: "https://github.com/peter-ywd" }],
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: "local",
    },
    editLink: {
      pattern: "https://github.com/peter-ywd/vite-press-docs/edit/main/:path",
      text: "在 GitHub 上编辑此页面",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
  },
};
const vitePressSidebarOptions = [
  {
    documentRootPath: "docs-2",
    scanStartPath: "/",
    basePath: "/docs-2/",
    resolvePath: "/docs-2/",
    useTitleFromFileHeading: true,
  },
  {
    documentRootPath: "docs-1",
    scanStartPath: "/",
    resolvePath: "/docs-1/",
    useTitleFromFrontmatter: true,
  },
];
export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions)
);
