<script setup lang="ts">
import { useDebounceFn } from '#imports'

const { $ts } = useI18n()

const filterModel = defineModel<string>('filter')
const localFilter = ref(filterModel.value)

const { inputDebounce } = useAppConfig()

const handleUpdateFilter = useDebounceFn((value: string) => {
  filterModel.value = value
}, inputDebounce)

const markedModel = defineModel<boolean>('marked')

const viewModel = defineModel<'expense' | 'income' | null | undefined>('view', {
  get: value => value ?? null,
  set: value => value ?? undefined,
})

const viewOptions = computed(() => [null, 'expense', 'income'].map(value => ({
  label: $ts(`view.${value}`),
  value,
})))
</script>

<template>
  <div class="flex items-center gap-5 py-1">
    <UInput
      v-model="localFilter"
      :placeholder="$ts('filter.placeholder')"
      class="flex-auto"
      @update:model-value="handleUpdateFilter"
    />

    <USelect
      v-model="viewModel"
      :items="viewOptions"
      class="w-45"
    />

    <UCheckbox
      v-model="markedModel"
      :label="$ts('marked.label')"
    />
  </div>
</template>
