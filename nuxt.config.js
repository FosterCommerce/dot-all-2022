export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  ssr: true,

  // Source files directory
  srcDir: 'src/',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Dot All 2022',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/helpers.js',
    '~/plugins/api.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
  ],

  server: {
    host: '0.0.0.0',
    strictPort: true,
    port: 3000,
  },

  // Nuxt http options : https://http.nuxtjs.org/options
  axios: {
    proxyHeaders: false,
    credentials: true,
    // proxy: true,
  },

  // proxy: {
  //   '/proxy': {
  //     target: process.env.CRAFT_BASE_URL,
  //     pathRewrite: {'^/proxy': '/'}
  //   },
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/image',
    '@nuxtjs/proxy'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extend the webpack config
    extend(config) {
      config.resolve.alias.vue = 'vue/dist/vue.common';
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      });
    },
  },
  
  env: {
    currentEnv: process.env.CRAFT_ENVIRONMENT || 'dev'
  },

  // server-only-runtime-config
  privateRuntimeConfig: {
    graphQLBearerToken: process.env.CRAFT_API_TOKEN,
    axios: {
      retry: 4,
      baseURL: process.env.CRAFT_BASE_URL,
    }
  },
  publicRuntimeConfig: {
    baseURL: process.env.CRAFT_BASE_URL,
    axios: {
      retry: true,
      browserBaseURL: process.env.CRAFT_BASE_URL,
    }
  }
}
