import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@regle/nuxt',
    '@vueuse/nuxt',
    'nuxt-i18n-micro',
    'nuxt-svgo-loader',
  ],

  devtools: {
    enabled: true,
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
      weights: [400, 500, 700],
      styles: ['normal'],
    },
  },

  i18n: {
    locales: [
      { code: 'ru', iso: 'ru-RU', displayName: 'Русский' },
      { code: 'en', iso: 'en-US', displayName: 'English' },
    ],
    defaultLocale: 'ru',
    translationDir: 'locales',
    meta: true,
    strategy: 'prefix_except_default',
  },

  regle: {
    setupFile: '~/regle-config.ts',
  },
})
