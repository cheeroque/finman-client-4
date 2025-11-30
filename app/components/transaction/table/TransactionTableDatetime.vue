<script setup lang="ts">
const { datetime } = defineProps<{
  datetime: string
}>()

const { $localePath } = useI18n()
const { formatDate, formatPeriod, parseDateTime } = useLocaleFormatter()

const period = computed(() => formatPeriod(parseDateTime(datetime)))

const monthLink = computed(() => $localePath(`/months/${period.value}`))

const date = computed(() => formatDate(datetime, {
  dateStyle: 'short',
}))

const time = computed(() => formatDate(datetime, {
  timeStyle: 'short',
}))
</script>

<template>
  <UiButtonBase
    :to="monthLink"
    class="hover:underline"
  >
    {{ date }},
    <span
      class="
        text-neutral-500
        dark:text-neutral-400
      "
    >{{ time }}</span>
  </UiButtonBase>
</template>
