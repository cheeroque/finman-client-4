<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{
  error: NuxtError
}>()

const { $localePath, $ts } = useI18n()

const errorMessage = computed(() => error.status === 404
  ? $ts('error.404')
  : error.message
)

const errorIcon = computed(() => error.status === 404
  ? 'mynaui:folder-x'
  : 'mynaui:daze-ghost'
)
</script>

<template>
  <main
    class="
      flex h-dvh flex-col bg-rose-300 text-rose-950
      dark:bg-rose-950 dark:text-rose-300
    "
  >
    <div class="m-auto flex max-w-100 flex-col items-center gap-4 text-center">
      <Icon
        :name="errorIcon"
        class="
          text-[5rem] text-rose-900
          dark:text-rose-200
        "
      />

      <h1
        class="
          text-5xl font-medium text-rose-900
          dark:text-rose-200
        "
      >
        {{ $ts('error.error') }} {{ error.status }}
      </h1>

      <p class="text-xl">
        {{ errorMessage }}
      </p>

      <UiButtonBase
        class="
          text-rose-900 underline
          hover:text-rose-950 hover:opacity-100
          dark:text-rose-200
          dark:hover:text-rose-300
        "
        @click="clearError({ redirect: $localePath('/') })"
      >
        {{ $ts('error.goHome') }}
      </UiButtonBase>
    </div>
  </main>
</template>
