export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  server: {
    host: '0.0.0.0',
    strictPort: true,
    port: 3000
  },

  // Nuxt http options : https://http.nuxtjs.org/options
  http: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/image',
  ],

  // Add PostCSS plugins
  /* postcss: {
    plugins: {
      'postcss-nested': {},
      cssnano: {
        preset: [
          'default',
          {
            // Disable this optimization until this fix lands
            // https://github.com/cssnano/cssnano/issues/932
            mergeRules: false,
          },
        ],
      },
    },
  }, */

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

  // server-only-runtime-config
  privateRuntimeConfig: {
    // runtime-config for @nuxtjs/http
    axios: {
      baseURL: process.env.CRAFT_BASE_URL
    }
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.CRAFT_BASE_URL
    }
  }
}
