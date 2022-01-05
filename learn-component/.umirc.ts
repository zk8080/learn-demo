/*
 * @Author: your name
 * @Date: 2021-03-21 16:53:07
 * @LastEditTime: 2021-11-03 21:56:01
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
    { path: '/list-view', component: '@/pages/list-view/index' },
    { path: '/verification-code', component: '@/pages/verification-code/index' },
    { path: '/ceiling', component: '@/pages/ceiling/index' },
    { path: '/reducerTest', component: '@/pages/reducerTest/index' },
    { path: '/testRef', exact: true, component: '@/pages/TestRef/index' },
    {
      path: '/', 
      component: '@/layout/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/test', component: '@/pages/test', exact: true },
      ]
    },
    
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
  },
  // extraBabelPlugins: [
  //   [
  //     'import',
  //     {
  //       libraryName: 'zk-play-ui',
  //       style: true,
  //       libraryDirectory: 'es', // 或 lib
  //     },
  //     'zk-play-ui',
  //   ],
  // ],
});
