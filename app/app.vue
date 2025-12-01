<script setup lang="ts">
import { ConfigProvider } from 'reka-ui'

useHead({
  bodyAttrs: {
    class: 'bg-primary-200 text-neutral-900 dark:bg-primary-990 dark:text-white',
  },
})

const { getLocale } = useI18n()
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator
      :color="false"
      :height="2"
      :throttle="0"
      class="
        bg-amber-500
        dark:bg-amber-600
      "
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
