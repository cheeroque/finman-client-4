<script setup lang="ts">
import type { ZonedDateTime } from '@internationalized/date'

const {
  formatterOptions = {
    dateStyle: 'short',
    timeStyle: 'short',
  },
  placeholder,
} = defineProps<{
  disabled?: boolean
  formatterOptions?: Intl.DateTimeFormatOptions
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
const timepickerShown = ref(false)

// Local calendar value
const dateTimeValue = ref<ZonedDateTime | undefined>(getDateTime())

watch(modelValue, () => {
  dateTimeValue.value = getDateTime()
})

function getDateTime() {
  if (!modelValue.value) {
    return
  }

  return parseDateTime(modelValue.value)
}

function handleClickDay(day: ZonedDateTime | undefined) {
  dateTimeValue.value = day
  timepickerShown.value = true
}

// Local selected time
const timeValue = computed(() => ({
  hour: dateTimeValue.value?.hour,
  minute: dateTimeValue.value?.minute,
}))

function handleUpdateTime(time: typeof timeValue.value) {
  popoverOpen.value = false

  if (!dateTimeValue.value) {
    return
  }

  const { hour, minute } = time
  dateTimeValue.value = dateTimeValue.value.set({ hour, minute })

  modelValue.value = dateTimeValue.value.toAbsoluteString()
}
</script>

<template>
  <UPopover
    v-model:open="popoverOpen"
    :content="{ align: 'start' }"
    :ui="{ content: 'overflow-hidden' }"
  >
    <UButton
      :disabled
      color="neutral"
      icon="solar:calendar-linear"
      variant="outline"
      @click="timepickerShown = false"
    >
      {{ displayValue }}
    </UButton>

    <template #content>
      <div class="relative overflow-hidden">
        <UCalendar v-model="(dateTimeValue as ZonedDateTime | undefined)">
          <template #day="{ day }">
            <button
              class="w-full self-stretch"
              @click.stop="handleClickDay(day as ZonedDateTime)"
            >
              {{ day.day }}
            </button>
          </template>
        </UCalendar>

        <Transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div
            v-if="timepickerShown"
            class="absolute inset-0 bg-white transition-opacity"
          >
            <SharedTimePicker
              :model-value="timeValue"
              class="h-full"
              @update:model-value="handleUpdateTime"
            />
          </div>
        </Transition>
      </div>
    </template>
  </UPopover>
</template>
