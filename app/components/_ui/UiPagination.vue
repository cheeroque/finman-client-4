<script setup lang="ts">
import {
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from 'reka-ui'

const {
  itemsPerPage = 1,
  total = 0,
} = defineProps<{
  itemsPerPage?: number
  total?: number
}>()

const modelValue = defineModel<number>({
  default: 1,
})

const ITEM_CLASS = `flex min-w-10 items-center justify-center rounded-lg bg-neutral-100 p-2
  transition-(--transition-button)
  not-disabled:cursor-pointer not-disabled:hover:bg-primary-100
  disabled:opacity-50
  dark:bg-neutral-900 dark:not-disabled:hover:bg-primary-900`

const PAGE_ITEM_CLASS = `data-selected:bg-primary-600 data-selected:text-white
  data-selected:hover:bg-primary-700
  dark:data-selected:bg-primary-500 dark:data-selected:text-neutral-900
  dark:data-selected:hover:bg-primary-400`
</script>

<template>
  <PaginationRoot
    v-model:page="modelValue"
    :items-per-page
    :total
  >
    <PaginationList
      v-slot="{ items }"
      class="
        flex items-center gap-1 text-neutral-700
        dark:text-neutral-300
      "
    >
      <PaginationFirst :class="ITEM_CLASS">
        <Icon
          name="mynaui:chevron-double-left"
          class="text-2xl"
        />
      </PaginationFirst>

      <PaginationPrev
        :class="[
          ITEM_CLASS,
          'max-lg:hidden',
        ]"
      >
        <Icon
          name="mynaui:chevron-left"
          class="text-2xl"
        />
      </PaginationPrev>

      <template v-for="page in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="`page-${page.value}`"
          :value="page.value"
          :class="[
            ITEM_CLASS,
            PAGE_ITEM_CLASS,
          ]"
        >
          {{ page.value }}
        </PaginationListItem>
      </template>

      <PaginationNext
        :class="[
          ITEM_CLASS,
          'max-lg:hidden',
        ]"
      >
        <Icon
          name="mynaui:chevron-right"
          class="text-2xl"
        />
      </PaginationNext>

      <PaginationLast :class="ITEM_CLASS">
        <Icon
          name="mynaui:chevron-double-right"
          class="text-2xl"
        />
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
