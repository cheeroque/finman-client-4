<script setup lang="ts">
const modelValue = defineModel<boolean>()

const filterRef = useTemplateRef('filterRef')

whenever(filterRef, (value) => {
  nextTick(() => value.inputRef?.inputRef?.focus())
})
</script>

<template>
  <UiDrawer v-model="modelValue">
    <div class="p-3">
      <div
        class="
          flex flex-col gap-3 border-b border-primary-300/50 pb-3
          dark:border-primary-900
        "
      >
        <TransactionFilterText
          ref="filterRef"
          :placeholder="$ts('filter.text.placeholder')"
          class="col-span-2"
        />

        <TransactionFilterMarked class="h-12 min-w-0" />
      </div>
    </div>
  </UiDrawer>
</template>
