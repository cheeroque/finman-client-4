<script setup lang="ts">
import { en, ru } from '@nuxt/ui/locale'

const availableLocales = { en, ru }
const { getLocale } = useI18n()

const appLocale = computed(() => availableLocales[getLocale() as keyof typeof availableLocales])
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator
      :height="2"
      :throttle="0"
    />

    <NuxtRouteAnnouncer />

    <UApp :locale="appLocale">
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
