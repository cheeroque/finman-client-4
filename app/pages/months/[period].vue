<script setup lang="ts">
import type { BreadcrumbItem } from '~/components/_ui'
import { useMonthCategoriesQuery } from '~/composables/queries/month-categories'

const route = useRoute()

const { state, isLoading } = useMonthCategoriesQuery()

const { formatDate, parsePeriod } = useLocaleFormatter()

const parsedPeriod = computed(() => parsePeriod(route.params.period as string))

const displayPeriod = computed(() => formatDate(parsedPeriod.value.toISOString(), {
  month: 'long',
  year: 'numeric',
}))

const { $localePath, $ts } = useI18n()

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'mingcute:home-7-line',
    to: $localePath('/'),
  },
  {
    text: $ts('mainMenu.months'),
    to: $localePath('/months'),
  },
  {
    active: true,
    text: displayPeriod.value,
  },
])
</script>

<template>
  <main class="flex flex-col gap-8">
    <div>
      <div
        class="
          border-(--c-outline-light)
          max-lg:border-b max-lg:p-3
          lg:mb-8
        "
      >
        <UiBreadcrumb :items="breadcrumbs" />
      </div>

      <MonthTransactionsTable
        :data="state.data"
        :loading="isLoading"
      />
    </div>

    <div class="max-lg:px-3">
      <MonthTransactionsNav :current-date="parsedPeriod" />
    </div>
  </main>
</template>
