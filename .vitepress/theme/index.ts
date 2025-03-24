// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { inBrowser } from 'vitepress'
// 导入hooks
import useVisitData from "../hooks/useVisitData"

import Layout from "../components/Layout.vue"
import Giscus from '@giscus/vue'

import "vitepress-markdown-timeline/dist/theme/index.css";

import './style.css'
import './custom.css';

let ignoreList = ['/a', '/b']
export default {
  extends: DefaultTheme,
  Layout, 
  enhanceApp({ app, router, siteData }) {
    if (inBrowser) {
      // 路由加载完成，在加载页面组件后（在更新页面组件之前）调用。
      router.onAfterPageLoad = (to: string) => {
        // 调用统计访问接口hooks
        if (!ignoreList.includes(to)) {
          useVisitData()
        }
      }
    }
    app.component('GiscusComment', Giscus)
    // ...
  }
} satisfies Theme
