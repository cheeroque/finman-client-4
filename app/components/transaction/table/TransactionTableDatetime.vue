<script setup lang="ts">
const { datetime } = defineProps<{
  datetime: string
}>()

const { $localePath } = useI18n()
const { formatPeriod, parseDateTime } = useLocaleFormatter()

const period = computed(() => formatPeriod(parseDateTime(datetime)))
const monthLink = computed(() => $localePath(`/months/${period.value}`))
</script>

<template>
  <UiButtonBase
    :to="monthLink"
    class="hover:underline"
  >
    <TableCellDatetime :datetime />
  </UiButtonBase>
</template>
