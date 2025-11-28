<script setup lang="ts">
import { twMerge, type ClassNameValue } from 'tailwind-merge'

import { getEmptyArray } from '~~/shared/utils'

defineProps<{
  headerClass?: ClassNameValue
  monthClass?: ClassNameValue
  yearClass?: ClassNameValue
}>()

const modelValue = defineModel<{ month: number, year: number } | undefined>()

const { $localePath } = useI18n()

const { formatPeriod } = useLocaleFormatter()

const { data } = useTransactionDates()

const start = computed(() => data.value?.start)
const end = computed(() => data.value?.end)

const activeYear = ref(modelValue.value?.year ?? end.value?.year ?? 0)

watch(activeYear, (year) => {
  if (modelValue.value) {
    modelValue.value.year = year
  }
})

const visibleYears = computed(() => getEmptyArray(3).map((_, yearIndex) => {
  const year = activeYear.value + yearIndex - 1

  const months = getEmptyArray(12).map((_, monthIndex) => {
    const month = monthIndex + 1
    const disabled = (year <= Number(start.value?.year) && month < Number(start.value?.month))
      || (year >= Number(end.value?.year) && month > Number(end.value?.month))

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

const isStart = computed(() => activeYear.value <= Number(start.value?.year))
const isEnd = computed(() => activeYear.value >= Number(end.value?.year))

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
    return month === end.value?.month && year === end.value.year
  }

  return month === modelValue.value.month && year === modelValue.value.year
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <div
      :class="twMerge(
        'flex items-center gap-3 font-semibold',
        headerClass,
      )"
    >
      <UiButtonBase
        :disabled="isStart"
        class="
          flex flex-none text-neutral-400
          hover:text-primary-400
          dark:text-neutral-600 dark:hover:text-primary-600
        "
        @click="shiftYear(-1)"
      >
        <Icon
          name="mynaui:chevron-left"
          class="text-2xl"
        />
      </UiButtonBase>

      <span class="flex-auto text-center">
        {{ activeYear }}
      </span>

      <UiButtonBase
        :disabled="isEnd"
        class="
          flex flex-none text-neutral-400
          hover:text-primary-400
          dark:text-neutral-600 dark:hover:text-primary-600
        "
        @click="shiftYear(+1)"
      >
        <Icon
          name="mynaui:chevron-right"
          class="text-2xl"
        />
      </UiButtonBase>
    </div>

    <div class="overflow-hidden">
      <div
        ref="sliderRef"
        class="flex justify-center transition-transform duration-0"
      >
        <div
          v-for="year in visibleYears"
          :key="year.year"
          :class="
            twMerge(
              'grid w-full flex-none grid-cols-4 gap-5',
              yearClass,
            )"
        >
          <div
            v-for="month in year.months"
            :key="`${year.year}-${month}`"
            class="flex"
          >
            <UiButtonBase
              :data-active="isMonthActive(month) || undefined"
              :disabled="month.disabled"
              :to="$localePath(`/months/${formatPeriod(month)}`)"
              :class="
                twMerge(
                  `
                    flex aspect-3/2 w-full items-center justify-center
                    rounded-lg bg-primary-200 text-center text-primary-800
                    not-data-disabled:hover:bg-primary-300
                    data-active:bg-primary-600 data-active:font-semibold
                    data-active:text-white
                    not-data-disabled:data-active:hover:bg-primary-700
                    dark:bg-primary-800 dark:text-primary-200
                    dark:not-data-disabled:hover:bg-primary-700
                    dark:data-active:bg-primary-500
                    dark:data-active:text-neutral-900
                    dark:not-data-disabled:data-active:hover:bg-primary-400
                  `,
                  monthClass,
                )
              "
            >
              {{ month.month }}
            </UiButtonBase>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
