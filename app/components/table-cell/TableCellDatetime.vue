<script setup lang="ts">
const { datetime } = defineProps<{
  datetime: string
}>()

const { getLocale } = useI18n()

const datetimeParsed = computed(() => Date.parse(datetime))
const locale = computed(() => getLocale())
</script>

<template>
  <span>
    <NuxtTime
      date-style="short"
      :datetime="datetimeParsed"
      :locale
    />,

    <NuxtTime
      time-style="short"
      :datetime="datetimeParsed"
      :locale
      class="
        text-neutral-500
        dark:text-neutral-400
      "
    />
  </span>
</template>
