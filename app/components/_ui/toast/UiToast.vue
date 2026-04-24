<script setup lang="ts">
import type { ToastProps } from '~/components/_ui/types'

defineProps<ToastProps>()

const emit = defineEmits<{
  hide: []
}>()

const TITLE_VARIANT_CLASSES = {
  danger: 'text-rose-800 dark:text-rose-200',
  success: 'text-lime-800 dark:text-lime-200',
  warning: 'text-amber-800 dark:text-amber-200',
} as const

const VARIANT_ICONS = {
  danger: 'mynaui:x-octagon-solid',
  success: 'mynaui:check-circle-solid',
  warning: 'mynaui:danger-triangle-solid',
} as const

const PROGRESS_VARIANT_CLASSES = {
  danger: 'bg-rose-600 dark:bg-rose-500',
  success: 'bg-lime-600 dark:bg-lime-500',
  warning: 'bg-amber-600 dark:bg-amber-500',
} as const

const indicatorScale = ref(1)

onMounted(() => setTimeout(() => {
  indicatorScale.value = 0
}, 10))

function hide() {
  emit('hide')
}
</script>

<template>
  <div
    class="
      relative flex items-center gap-2 overflow-hidden rounded-lg bg-white px-4
      py-3.5 text-sm shadow-sm
      dark:bg-black
    "
  >
    <Icon
      :name="VARIANT_ICONS[variant]"
      :class="mergeClasses(
        'flex-none self-start text-xl',
        TITLE_VARIANT_CLASSES[variant],
      )"
    />

    <div>
      <p
        v-if="title"
        :class="mergeClasses(
          'font-medium',
          TITLE_VARIANT_CLASSES[variant],
        )"
      >
        {{ title }}
      </p>

      <p>
        {{ description }}
      </p>
    </div>

    <UiButtonBase
      class="
        absolute top-3 right-3 text-neutral-300
        hover:text-neutral-500
        dark:text-neutral-700
        dark:hover:text-neutral-400
      "
      @click="hide"
    >
      <Icon
        name="mynaui:x-circle-solid"
        class="text-xl"
      />
    </UiButtonBase>

    <span
      v-if="duration"
      aria-hidden="true"
      :style="{
        '--indicator-duration': `${duration}ms`,
        '--indicator-scale': indicatorScale,
      }"
      :class="mergeClasses(
        'absolute inset-x-0 top-0 h-0.5 scale-x-0 rounded-full',
        'origin-left scale-x-(--indicator-scale) transition-transform',
        'duration-(--indicator-duration)',
        PROGRESS_VARIANT_CLASSES[variant],
      )"
    />
  </div>
</template>
