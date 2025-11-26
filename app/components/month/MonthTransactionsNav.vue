<script setup lang="ts">
import type { ZonedDateTime } from '@internationalized/date'

const { currentDate } = defineProps<{
  currentDate: Date
}>()

const { formatDate, formatPeriod, parseDateTime } = useLocaleFormatter()

const previousDate = computed(() => parseDateTime(currentDate).subtract({ months: 1 }))
const previousPeriod = computed(() => formatPeriod(previousDate.value))
const previousPeriodCaptions = computed(() => getPeriodCaptions(previousDate.value))

const nextDate = computed(() => parseDateTime(currentDate).add({ months: 1 }))
const nextPeriod = computed(() => formatPeriod(nextDate.value))
const nextPeriodCaptions = computed(() => getPeriodCaptions(nextDate.value))

function getPeriodCaptions(datetime: ZonedDateTime) {
  const datetimestring = datetime.toAbsoluteString()

  return {
    long: formatDate(datetimestring, { month: 'long', year: 'numeric' }),
    short: formatDate(datetimestring, { month: 'numeric', year: 'numeric' }),
  }
}

const { data, status } = useTransactionDates()
const isFirstTransactionLoading = useAsyncDataLoading(status)

const start = computed(() => data.value?.start)
const end = computed(() => data.value?.end)

const isPreviousDisabled = computed(() => previousDate.value.year <= Number(start.value?.year)
  && previousDate.value.month < Number(start.value?.month)
)

const isNextDisabled = computed(() => nextDate.value.year >= Number(end.value?.year)
  && nextDate.value.month > Number(end.value?.month)
)
</script>

<template>
  <div class="flex justify-between gap-5">
    <UiButton
      :disabled="isPreviousDisabled || isFirstTransactionLoading"
      icon="mingcute:arrow-left-line"
      :to="$localePath(`/months/${previousPeriod}`)"
      variant="primary-light"
    >
      <span class="max-lg:hidden">
        {{ previousPeriodCaptions.long }}
      </span>

      <span class="lg:hidden">
        {{ previousPeriodCaptions.short }}
      </span>
    </UiButton>

    <UiButton
      :disabled="isNextDisabled || isFirstTransactionLoading"
      :to="$localePath(`/months/${nextPeriod}`)"
      trailing-icon="mingcute:arrow-right-line"
      variant="primary-light"
    >
      <span class="max-lg:hidden">
        {{ nextPeriodCaptions.long }}
      </span>

      <span class="lg:hidden">
        {{ nextPeriodCaptions.short }}
      </span>
    </UiButton>
  </div>
</template>
