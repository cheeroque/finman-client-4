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

const ITEM_CLASS = `flex min-w-10 items-center justify-center rounded-lg border
  border-(--c-pagination-border) bg-(--c-pagination-bg) p-2
  transition-(--transition-button)
  not-disabled:cursor-pointer
  not-disabled:hover:border-(--c-pagination-hover-border)
  not-disabled:hover:bg-(--c-pagination-hover-bg)
  disabled:opacity-50`

const PAGE_ITEM_CLASS = `data-selected:border-(--c-pagination-active-border)
  data-selected:bg-(--c-pagination-active-bg)
  data-selected:text-(--c-pagination-active-text)
  data-selected:hover:border-(--c-pagination-active-border)
  data-selected:hover:bg-(--c-pagination-active-bg)`
</script>

<template>
  <PaginationRoot
    v-model:page="modelValue"
    :items-per-page
    :total
  >
    <PaginationList
      v-slot="{ items }"
      class="flex items-center gap-1 text-(--c-pagination-text)"
    >
      <PaginationFirst :class="ITEM_CLASS">
        <Icon
          name="mingcute:arrows-left-line"
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
          name="mingcute:arrow-left-line"
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
          name="mingcute:arrow-right-line"
          class="text-2xl"
        />
      </PaginationNext>

      <PaginationLast :class="ITEM_CLASS">
        <Icon
          name="mingcute:arrows-right-line"
          class="text-2xl"
        />
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
