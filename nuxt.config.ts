// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-i18n-micro',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    apiBase: '',
  },

  compatibilityDate: '2025-07-15',

  eslint: {
    config: {
      stylistic: true,
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
})
