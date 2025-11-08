<script setup lang="ts">
import type { MonthCategories } from '~~/shared/types/month'

const route = useRoute()

const { state } = useQuery<MonthCategories>({
  key: () => [
    'month',
    route.params.period as string,
  ],

  query: () => useRequestFetch()(`/api/months/${route.params.period}`),

  placeholderData: (previousData) => previousData,
})

const { formatDate, formatPeriod, parseDate, parsePeriod } = useLocaleFormatter()

const parsedPeriod = computed(() => parsePeriod(route.params.period as string))

const displayPeriod = computed(() => formatDate(parsedPeriod.value.toISOString(), {
  month: 'long',
  year: 'numeric',
}))

const previousDate = computed(() => parseDate(parsedPeriod.value).subtract({ months: 1 }))
const previousPeriod = computed(() => formatPeriod(previousDate.value))
const previousPeriodCaption = computed(() => formatDate(previousDate.value.toAbsoluteString(), {
  month: 'long',
  year: 'numeric',
}))

const nextDate = computed(() => parseDate(parsedPeriod.value).add({ months: 1 }))
const nextPeriod = computed(() => formatPeriod(nextDate.value))
const nextPeriodCaption = computed(() => formatDate(nextDate.value.toAbsoluteString(), {
  month: 'long',
  year: 'numeric',
}))
</script>

<template>
  <UMain as="main">
    <UContainer class="py-5">
      <UCard>
        <template #header>
          {{ displayPeriod }}
        </template>

        <MonthTransactionsTable :data="state.data" />

        <template #footer>
          <div class="flex justify-between gap-5">
            <UButton
              :to="$localePath(`/months/${previousPeriod}`)"
              icon="solar:arrow-left-linear"
              variant="soft"
            >
              {{ previousPeriodCaption }}
            </UButton>

            <UButton
              :to="$localePath(`/months/${nextPeriod}`)"
              trailing-icon="solar:arrow-right-linear"
              variant="soft"
            >
              {{ nextPeriodCaption }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UContainer>
  </UMain>
</template>
