<script setup lang="ts">
import type { BreadcrumbItem } from '~/components/_ui/types'

const route = useRoute()

const monthStore = useMonthStore()
const { loading, monthTransactions } = storeToRefs(monthStore)

const period = computed(() => String(route.params.period))

await useAsyncData(() => monthStore.fetchMonthTransactions(period.value))

const { formatDate, parsePeriod } = useLocaleFormatter()

const parsedPeriod = computed(() => parsePeriod(period.value))
const displayPeriod = computed(() => formatDate(parsedPeriod.value.toISOString(), {
  month: 'long',
  year: 'numeric',
}))

const { $localePath, $ts } = useI18n()

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    text: $ts('mainMenu.home'),
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

useHead({
  titleTemplate: usePageTitle('month.title', capitalize(displayPeriod.value)),
})
</script>

<template>
  <main class="flex flex-col gap-8">
    <div>
      <div
        class="
          border-primary-100
          max-lg:border-b max-lg:p-3
          lg:mb-8
          dark:border-primary-990
        "
      >
        <UiBreadcrumb :items="breadcrumbs" />
      </div>

      <MonthTransactionsTable
        :data="monthTransactions"
        :loading
      />
    </div>

    <div class="max-lg:px-3">
      <MonthTransactionsNav :current-date="parsedPeriod" />
    </div>
  </main>
</template>
