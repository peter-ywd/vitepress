import { defineConfigWithTheme } from "vitepress";
import { usePosts } from "../src/composables/usePosts";
import type { ThemeConfig } from "../src/types";
import timeline from "vitepress-markdown-timeline";
import { generateIndexMd } from "./utils/generateNav";

const NAV_LIST = [
  { text: "笔记", path: "mark" },
  { text: "面试题", path: "interview" },
];
let sidebar = {};
function createIndexMdFile() {
  NAV_LIST.forEach(async (nav) => {
    const posts =  await generateIndexMd(nav.path);
    sidebar[nav.path] = {
      items: posts.map(item => {
        return { text: item.title, link: item.permalink || item.url }
      })
    }
  });
}
const { posts, rewrites } = await usePosts({
  pageSize: 6,
  homepage: true,
  srcDir: ["posts", "mark", "interview"],
  autoExcerpt: 150,
});

export default defineConfigWithTheme<ThemeConfig>({
  base: "/",
  title: "Peter",
  titleTemplate: "VitePress Theme Minimalism",
  description: "VitePress Theme Minimalism",
  rewrites,
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    posts,
    page: {
      max: 5,
    },
    // comment: {
    //   serverURL: 'https://domain.com',
    //   reaction: true
    // },
    ads: {
      asideOutlineAfter: [
        // [
        //   {
        //     title: 'Spotify - 每月低于 10 元',
        //     img: 'https://minio.zhichao.org/assets/spotify.png',
        //     link: 'https://nf.video/tST8B/?gid=4'
        //   },
        //   {
        //     title: 'Netflix - 每月低至 25 元',
        //     img: 'https://minio.zhichao.org/assets/netflix.png',
        //     link: 'https://nf.video/tST8B/?gid=1'
        //   }
        // ]
      ],
      sidebarNavAfter: [
        // {
        //   title: 'ouo.io - 縮短網址也可以賺錢',
        //   img: 'https://ouo.io/images/banners/r5.jpg',
        //   link: 'https://ouo.io/ref/QQbUaFAo'
        // }
      ],
      docAfter: [
        // {
        //   title: '关注微信公众号',
        //   img: 'https://minio.zhichao.org/assets/wechat-big.png'
        // },
        // [
        //   {
        //     title: 'V.PS- 美国 CN2 GIA / 9929 / CMIN2 顶级线路',
        //     img: 'https://minio.zhichao.org/assets/vps.png',
        //     link: 'https://link.zhichao.org/vps'
        //   },
        //   {
        //     title: '搬瓦工 - 美国 CN2 优化线路',
        //     img: 'https://minio.zhichao.org/assets/bwh.png',
        //     link: 'https://link.zhichao.org/bwh'
        //   },
        //   {
        //     title: 'RackNerd - 美国 163 直连线路',
        //     img: 'https://minio.zhichao.org/assets/rn.png',
        //     link: 'https://link.zhichao.org/rn'
        //   }
        // ]
      ],
    },
    // logo: '/profile.png',
    outline: { level: 2 },
    nav: [
      { text: "首页", link: "/" },
      ...NAV_LIST.map((nav) => ({
        text: nav.text,
        link: `${nav.path}/index`,
        activeMatch: `/${nav.path}/`,
      })),
      { text: "分类", link: "/category" },
      { text: "标签", link: "/tags" },
      { text: "归档", link: "/archives" },
    ],
    sidebar,
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/izhichao/vitepress-theme-minimalism",
      },
    ],
    footer: {
      // message:
      //   'Theme by <a href="https://github.com/izhichao/vitepress-theme-minimalism" target="_blank">Minimalism</a>',
      // copyright: 'Copyright © 2017-2024 <a href="https://github.com/izhichao" target="_blank">只抄</a>'
    },
    search: { provider: "local" },
  },
  markdown: {
    config: (md) => {
      md.use(timeline);
    },
    theme: "dark-plus",
    lineNumbers: true,
    //时间线
  },
  vite: {
    // 使用 Vite 的构建钩子
    plugins: [
      {
        name: "generate-md-files",
        // 开发服务器钩子
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            await createIndexMdFile();
            next();
          });
        },
        // 构建钩子
        buildStart: async () => {
          await createIndexMdFile();
        },
        // 监听文件变化（开发模式）
        handleHotUpdate({ file }) {
          if (NAV_LIST.map((_) => _.path).some((path) => file.includes(path))) {
            createIndexMdFile();
          }
        },
      },
    ],
  },
  // srcExclude: ['README.md', 'README_en-US.md']
});

// const vitePressSidebarOptions = [
//   {
//     documentRootPath: "interview",
//     scanStartPath: "/",
//     basePath: "/interview/",
//     resolvePath: "/interview/",
//     useTitleFromFrontmatter: true,
//   },
//   {
//     documentRootPath: "mark",
//     scanStartPath: "/",
//     resolvePath: "/mark/",
//     useTitleFromFrontmatter: true,
//   },
// ];
