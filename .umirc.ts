import { defineConfig } from 'umi';
import { InjectManifest } from 'workbox-webpack-plugin';

export default defineConfig({
  hash: true,
  webpack5: {},
  devServer: {
    port: 8000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://st.tomsawyer2.xyz',
        changeOrigin: true,
      },
    },
  },
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/layout/index',
      routes: [
        { path: '/index', component: '@/pages/index/index' },
        { path: '/admin', component: '@/pages/admin/index' }
      ]
    },
  ],
  title: '智能公厕',
  fastRefresh: {},
  dynamicImport: {},
  // mfsu: {},
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed',
  },
  copy: ['/src/pwa/manifest.webmanifest'],
  links: [{ rel: 'manifest', href: '/manifest.webmanifest' }],
  chainWebpack: (config: any) => {
    config.plugin('workbox').use(InjectManifest, [
      {
        swSrc: './src/pwa/service-worker.ts',
        swDest: 'service-worker.js',
        exclude: [/\.map$/, /favicon\.ico$/, /^manifest.*\.js?$/],
      },
    ]);
  },
});
