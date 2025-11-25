<script setup lang="ts">
import { ConfigProvider } from 'reka-ui'

useHead({
  bodyAttrs: {
    class: 'bg-(--c-app-bg) text-(--c-text)',
  },
})

const { getLocale } = useI18n()
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator
      :height="2"
      :throttle="0"
    />

    <NuxtRouteAnnouncer />

    <ConfigProvider :locale="getLocale()">
      <NuxtPage />

      <ClientOnly>
        <UiDialogProvider />
      </ClientOnly>
    </ConfigProvider>
  </NuxtLayout>
</template>
