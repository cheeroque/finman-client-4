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
        rounded-t-xl bg-white p-3
        dark:border dark:border-neutral-800 dark:bg-neutral-950
      "
    >
      <div class="flex flex-col gap-3">
        <TransactionFilterText
          ref="filterRef"
          :placeholder="$ts('filter.text.placeholder')"
          class="col-span-2"
        />

        <TransactionFilterMarked class="h-8" />
      </div>
    </div>
  </UiDrawer>
</template>
