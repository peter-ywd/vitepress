import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import timeline  from "vitepress-markdown-timeline";

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  lang: "zh", //中文配置
  title: "vitepress blog",
  description: "vitepress blog",
  base: "/vitepress/",
  markdown: {
    lineNumbers: true,
    //时间线
    config: (md) => {
      md.use(timeline);
    },
  },
  ignoreDeadLinks: true,
  themeConfig: {
    
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "前端面试题w", link: "/docs-1/测试文件" },
      { text: "面试题", link: "/docs-2/wqwqw/TEST-Router" },
    ],

    // sidebar: 'auto',

    socialLinks: [{ icon: "github", link: "https://github.com/peter-ywd" }],
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    search: {
      // 搜索
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    editLink: {
      pattern: "https://github.com/peter-ywd/vite-press-docs/edit/main/:path",
      text: "在 GitHub 上编辑此页面",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    notFound:{ // 404页
      title: '未找到页面，迷路了~',
      quote: '请检查地址是否正确，或当前页面未开通，点击下方按钮返回首页',
      linkText: '返回首页'
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
