import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@regle/nuxt',
    '@vueuse/nuxt',
    'nuxt-i18n-micro',
    'nuxt-svgo-loader',
  ],

  imports: {
    dirs: [
      '~/composables',
      '~/composables/mutations',
      '~/composables/queries',
    ],
  },

  devtools: {
    enabled: true,
  },
  app: {
    head: {
      meta: [
        {
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
      ],
      link: [
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
        {
          rel: 'shortcut icon',
          type: 'image/svg',
          href: '/icon.svg',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          href: '/apple-touch-icon-180x180.png',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    apiBase: '',
    staticBase: '',
  },

  compatibilityDate: '2025-07-15',

  nitro: {
    experimental: {
      asyncContext: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
    },
    provider: 'google',
  },

  i18n: {
    locales: [
      { code: 'ru', iso: 'ru-RU', displayName: 'Русский' },
      { code: 'en', iso: 'en-US', displayName: 'English' },
    ],
    defaultLocale: 'ru',
    // When enabled, translations flash to keypath placeholder on route change
    disablePageLocales: true,
    translationDir: 'locales',
    meta: true,
    strategy: 'prefix_except_default',
  },

  regle: {
    setupFile: '~/regle-config.ts',
  },
})
