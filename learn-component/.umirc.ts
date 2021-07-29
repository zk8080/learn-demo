/*
 * @Author: your name
 * @Date: 2021-03-21 16:53:07
 * @LastEditTime: 2021-03-21 17:45:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scroll-nav/.umirc.ts
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/list-view', component: '@/pages/list-view/index' },
    { path: '/verification-code', component: '@/pages/verification-code/index' },
  ],
  request: false,
  fastRefresh: {},
  postcssLoader: {
    postcssOptions: {
      plugins: {
        'postcss-px-to-viewport': {
          unitToConvert: 'px',
          viewportWidth: 375,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [],
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 568
        }
      },
    },
  }
});
