<script setup lang="ts">
const modelValue = defineModel<boolean>()

const filterRef = useTemplateRef('filterRef')

whenever(filterRef, (value) => {
  nextTick(() => value.inputRef?.inputRef?.focus())
})
</script>

<template>
  <UiDrawer v-model="modelValue">
    <div
      class="
        rounded-t-xl bg-primary-200 p-3
        dark:bg-primary-950
      "
    >
      <TransactionFilterText
        ref="filterRef"
        :placeholder="$ts('filter.text.placeholder')"
        class="col-span-2"
      />
    </div>
  </UiDrawer>
</template>
