<script setup lang="ts">
import type { Transaction } from '~~/shared/types/transaction'
import { getEmptyArray } from '~~/shared/utils'

const modelValue = defineModel<{ month: number, year: number }>()

const { $localePath } = useI18n()

const { state } = useQuery<Transaction>({
  key: ['transaction-first'],
  query: () => useRequestFetch()('/api/transactions/first'),
})

const { formatPeriod, parseDateTime } = useLocaleFormatter()

const now = new Date()

const end = computed(() => parseDateTime(now))
const start = computed(() => state.value.data?.created_at
  ? parseDateTime(state.value.data.created_at)
  : end.value
)

const activeYear = ref(modelValue.value?.year ?? end.value.year)

watch(activeYear, (year) => {
  if (modelValue.value) {
    modelValue.value.year = year
  }
})

const visibleYears = computed(() => getEmptyArray(3).map((_, yearIndex) => {
  const year = activeYear.value + yearIndex - 1

  const months = getEmptyArray(12).map((_, monthIndex) => {
    const month = monthIndex + 1
    const disabled = (year <= start.value.year && month < start.value.month)
      || (year >= end.value.year && month > end.value.month)

    return {
      disabled,
      month,
      year,
    }
  })

  return {
    year,
    months,
  }
}))

const isStart = computed(() => activeYear.value <= start.value.year)
const isEnd = computed(() => activeYear.value >= end.value.year)

const sliderRef = useTemplateRef('sliderRef')

function shiftYear(delta: 1 | -1) {
  if (!sliderRef.value) {
    return
  }

  const newValue = activeYear.value + delta

  sliderRef.value.style.transitionDuration = '300ms'
  sliderRef.value.style.transform = `translateX(${-100 * delta}%)`

  sliderRef.value.addEventListener('transitionend', () => {
    sliderRef.value!.style.transform = ''
    sliderRef.value!.style.transitionDuration = ''

    activeYear.value = newValue
  })
}

function isMonthActive({ month, year}: { month: number, year: number }) {
  if (!modelValue.value) {
    return month === end.value.month && year === end.value.year
  }

  return month === modelValue.value.month && year === modelValue.value.year
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex items-center gap-3">
      <UButton
        :disabled="isStart"
        icon="solar:arrow-left-linear"
        size="sm"
        variant="outline"
        class="flex-none"
        @click="shiftYear(-1)"
      />

      <span class="flex-auto text-lg font-medium text-center">
        {{ activeYear }}
      </span>

      <UButton
        :disabled="isEnd"
        icon="solar:arrow-right-linear"
        size="sm"
        variant="outline"
        class="flex-none"
        @click="shiftYear(+1)"
      />
    </div>

    <div class="overflow-hidden">
      <div
        ref="sliderRef"
        class="flex justify-center transition-transform duration-0"
      >
        <div
          v-for="year in visibleYears"
          :key="year.year"
          class="w-full flex-none grid grid-cols-4 gap-5"
        >
          <div
            v-for="month in year.months"
            :key="`${year.year}-${month}`"
            class="aspect-3/2 flex"
          >
            <UButton
              :active="isMonthActive(month)"
              :disabled="month.disabled"
              :to="$localePath(`/months/${formatPeriod(month)}`)"
              variant="soft"
              class="w-full justify-center"
            >
              {{ month.month }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
