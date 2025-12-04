<script setup lang="ts">
const { datetime } = defineProps<{
  datetime: string
}>()

const { getLocale } = useI18n()

const datetimeParsed = computed(() => Date.parse(datetime))
const locale = computed(() => getLocale())
</script>

<template>
  <span class="whitespace-nowrap">
    <NuxtTime
      date-style="short"
      :datetime="datetimeParsed"
      :locale
    />,

    <NuxtTime
      time-style="short"
      :datetime="datetimeParsed"
      :locale
      class="opacity-65"
    />
  </span>
</template>
