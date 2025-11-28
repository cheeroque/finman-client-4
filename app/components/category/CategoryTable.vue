<script setup lang="ts">
import type { Category } from '~~/shared/types/category'

const { categories = [] } = defineProps<{
  categories?: Category[]
  loading?: boolean
}>()

defineEmits<{
  clickEdit: [category: Category]
}>()

const { $localePath, $ts } = useI18n()

const columns = computed(() => [
  {
    accessorKey: 'name',
    header: $ts('columns.name'),
    meta: {
      class: {
        td: 'max-2xl:col-span-full',
      },
    },
  },
  {
    accessorKey: 'slug',
    header: $ts('columns.slug'),
    meta: {
      class: {
        td: 'max-2xl:text-sm',
      },
    },
  },
  {
    accessorKey: 'color',
    header: $ts('columns.color'),
    meta: {
      class: {
        td: 'max-2xl:mt-1.5',
      },
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    meta: {
      class: {
        td: 'self-end p-0 2xl:w-0 max-2xl:col-start-2 max-2xl:row-start-2 max-2xl:row-span-2',
      },
    },
  },
])
</script>

<template>
  <UiTable
    :columns
    :data="categories"
    :loading
    td-class="max-2xl:p-0"
    thead-class="max-2xl:hidden"
    tr-class="
      grid-cols-[auto_min-content]
      max-2xl:grid max-2xl:p-3 max-2xl:even:bg-neutral-50
      dark:max-2xl:even:bg-neutral-900
    "
  >
    <template #cell(name)="{ item, value }">
      <UiButtonBase
        :to="$localePath(`/categories/${item.slug}`)"
        class="
          flex items-center gap-2
          hover:text-primary-600 hover:underline
          dark:hover:text-primary-500
        "
      >
        <span class="2xl:flex-auto">{{ value }}</span>

        <Icon
          v-if="item.is_income"
          :aria-label="$ts('incomes')"
          name="mingcute:arrow-right-up-line"
          class="
            text-lime-500
            dark:text-lime-600
          "
        />

        <Icon
          v-else
          :aria-label="$ts('expenses')"
          name="mingcute:arrow-right-down-line"
          class="
            text-rose-500
            dark:text-rose-600
          "
        />
      </UiButtonBase>
    </template>

    <template #cell(slug)="{ item, value }">
      <UiButtonBase
        :to="$localePath(`/categories/${item.slug}`)"
        class="
          text-neutral-500
          hover:text-primary-600 hover:underline
          dark:text-neutral-400 dark:hover:text-primary-500
        "
      >
        {{ value }}
      </UiButtonBase>
    </template>

    <template #cell(color)="{ value }">
      <div class="flex">
        <CategoryTableColor :color="(value as string)" />
      </div>
    </template>

    <template #cell(actions)="{ item }">
      <UiButtonBase
        class="
          inline-flex px-4 py-3 text-neutral-300
          hover:text-primary-600
          max-2xl:-m-2 max-2xl:p-2
          dark:text-neutral-700 dark:hover:text-primary-500
        "
        @click="$emit('clickEdit', item)"
      >
        <Icon
          name="mingcute:edit-2-line"
          class="text-2xl"
        />
      </UiButtonBase>
    </template>
  </UiTable>
</template>
