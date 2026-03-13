<script setup lang="ts">
const { $ts } = useI18n()

const { showMarked } = useQueryParams()
</script>

<template>
  <UiCheckbox
    v-model="showMarked"
    icon-checked="mynaui:star-solid"
    icon-class="text-2xl"
    icon-unchecked="mynaui:star"
    variant="amber"
  >
    <span class="truncate">
      {{ $ts('filter.marked.label') }}
    </span>
  </UiCheckbox>
</template>
