<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, Time, toCalendarDateTime, toZoned } from '@internationalized/date'

const {
  formatterOptions = {
    dateStyle: 'short',
    timeStyle: 'short',
  },
  placeholder,
} = defineProps<{
  disabled?: boolean
  formatterOptions?: Intl.DateTimeFormatOptions
  hasError?: boolean
  placeholder?: string
}>()

const modelValue = defineModel<string>()

const { formatDate, parseDateTime } = useLocaleFormatter()

// Trigger caption
const displayValue = computed(() => {
  if (!modelValue.value) {
    return placeholder
  }

  return formatDate(modelValue.value, formatterOptions)
})

const popoverOpen = ref(false)

// Local calendar value
const dateValue = ref<CalendarDate | undefined>()
const timeValue = ref<Time | undefined>()

watch(modelValue, updateLocalValues, {
  immediate: true,
})

whenever(popoverOpen, updateLocalValues)

function updateLocalValues() {
  if (!modelValue.value) {
    return
  }

  const { day, month, year, hour, minute, second } = parseDateTime(modelValue.value)

  dateValue.value = new CalendarDate(year, month, day)
  timeValue.value = new Time(hour, minute, second)
}

function apply() {
  popoverOpen.value = false

  if (!dateValue.value) {
    return
  }

  modelValue.value = toZoned(toCalendarDateTime(dateValue.value, timeValue.value), getLocalTimeZone())
    .toDate()
    .toISOString()
}

function setNow() {
  popoverOpen.value = false
  modelValue.value = new Date().toISOString()
}
</script>

<template>
  <UiPopover
    v-model:open="popoverOpen"
    align="start"
    :align-offset="-1"
    side="bottom"
    :side-offset="4"
  >
    <template #trigger>
      <UiButton
        :data-invalid="hasError || undefined"
        :disabled
        trailing-icon="mingcute:calendar-3-line"
        variant="content"
        class="
          text-start
          data-invalid:text-rose-600 data-invalid:outline-rose-600
          dark:data-invalid:text-rose-500 dark:data-invalid:outline-rose-500
        "
      >
        <span class="flex-auto font-normal">
          {{ displayValue }}
        </span>
      </UiButton>
    </template>

    <div
      class="
        rounded-lg border border-neutral-200 bg-white
        dark:border-neutral-800 dark:bg-black
      "
    >
      <UiCalendar v-model="dateValue" />

      <div
        class="
          flex items-center border-t border-neutral-200 p-2
          dark:border-neutral-800
        "
      >
        <UiButtonBase
          class="
            flex rounded-md bg-white p-1 text-primary-900
            hover:bg-primary-100
            dark:bg-black dark:text-primary-200 dark:hover:bg-primary-900
          "
          @click="setNow()"
        >
          <Icon
            name="mingcute:time-line"
            class="text-xl"
          />
        </UiButtonBase>

        <UiTimeField
          v-model="timeValue"
          class="flex-auto justify-center"
        />

        <UiButtonBase
          class="
            flex rounded-md bg-lime-200 p-1 text-lime-800
            hover:bg-lime-300
            dark:bg-lime-900 dark:text-lime-200 dark:hover:bg-lime-800
          "
          @click="apply()"
        >
          <Icon
            name="mingcute:check-line"
            class="text-xl"
          />
        </UiButtonBase>
      </div>
    </div>
  </UiPopover>
</template>
