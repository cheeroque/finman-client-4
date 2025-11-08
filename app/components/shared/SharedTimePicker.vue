<script setup lang="ts">
import { getEmptyArray } from '~~/shared/utils'

const modelValue = defineModel<{
  hour: number | undefined
  minute: number | undefined
}>({
  required: true,
})

const activeHour = ref<number>()
const activeMinute = ref<number>()

watch(modelValue, ({ hour, minute }) => {
  activeHour.value = hour
  activeMinute.value = minute
}, { immediate: true })

const closestMinute = computed(() => {
  if (!activeMinute.value) {
    return
  }

  return Math.floor(activeMinute.value / 5) * 5
})

const displayValue = computed(() => {
  if (!(activeHour.value && activeMinute.value)) {
    return '--:--'
  }

  return [activeHour.value, activeMinute.value].join(':')
})

const hours = computed(() => getEmptyArray(24).map((_, index) => ({
  value: index,
  label: String(index).padStart(2, '0'),
})))

const minutes = computed(() => getEmptyArray(12).map((_, index) => ({
  value: index * 5,
  label: String(index * 5).padStart(2, '0'),
})))

const timePickerRef = useTemplateRef('timePickerRef')

function scrollToPeriods() {
  if (!(activeHour.value && closestMinute.value && timePickerRef.value)) {
    return
  }

  const hourEl = timePickerRef.value.querySelector(`[data-period="hour"][data-value="${activeHour.value}"]`)
  const minuteEl = timePickerRef.value.querySelector(`[data-period="minute"][data-value="${closestMinute.value}"]`)

  hourEl?.scrollIntoView()
  minuteEl?.scrollIntoView()
}

const hourSelected = ref(false)
const minuteSelected = ref(false)

function handleClickHour(hour: number) {
  activeHour.value = hour
  hourSelected.value = true

  if (minuteSelected.value && activeMinute.value !== undefined) {
    updateValue()
  }
}

function handleClickMinute(minute: number) {
  activeMinute.value = minute
  minuteSelected.value = true

  if (hourSelected.value && activeHour.value !== undefined) {
    updateValue()
  }
}

function updateValue() {
  modelValue.value = {
    hour: activeHour.value!,
    minute: activeMinute.value!,
  }
}

onMounted(scrollToPeriods)
</script>

<template>
  <div
    ref="timePickerRef"
    class="flex flex-col gap-2 text-sm p-2"
  >
    <span class="flex-none text-center font-medium">
      {{ displayValue }}
    </span>

    <div class="min-h-0 grid grid-cols-2 flex-auto gap-2">
      <div class="min-h-0 flex flex-col overflow-y-auto">
        <UButton
          v-for="hour in hours"
          :key="`h-${hour.value}`"
          :data-value="hour.value"
          :variant="hour.value === activeHour ? 'soft' : 'ghost'"
          data-period="hour"
          class="justify-center"
          @click="handleClickHour(hour.value)"
        >
          {{ hour.label }}
        </UButton>
      </div>

      <div class="min-h-0 flex flex-col overflow-y-auto">
        <UButton
          v-for="minute in minutes"
          :key="`m-${minute.value}`"
          :data-value="minute.value"
          :variant="minute.value === closestMinute ? 'soft' : 'ghost'"
          data-period="minute"
          class="justify-center"
          @click="handleClickMinute(minute.value)"
        >
          {{ minute.label }}
        </UButton>
      </div>
    </div>
  </div>
</template>
