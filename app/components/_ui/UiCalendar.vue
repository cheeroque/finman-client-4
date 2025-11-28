<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from 'reka-ui'

const modelValue = defineModel<CalendarDate>()
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    v-model="modelValue"
  >
    <CalendarHeader
      class="
        flex items-center border-b border-neutral-200 p-2
        dark:border-neutral-800
      "
    >
      <CalendarPrev
        class="
          flex size-6 cursor-pointer items-center justify-center
          text-neutral-500
          dark:text-neutral-400
        "
      >
        <Icon
          name="mingcute:left-line"
          class="text-xl"
        />
      </CalendarPrev>

      <CalendarHeading class="flex-auto text-center font-medium" />

      <CalendarNext
        class="
          flex size-6 cursor-pointer items-center justify-center
          text-neutral-500
          dark:text-neutral-400
        "
      >
        <Icon
          name="mingcute:right-line"
          class="text-xl"
        />
      </CalendarNext>
    </CalendarHeader>

    <div
      class="
        flex flex-col gap-4 space-y-4 p-2
        sm:flex-row
      "
    >
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full border-collapse select-none"
      >
        <CalendarGridHead class="text-center text-xs">
          <CalendarGridRow class="mb-1 grid w-full grid-cols-7">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>

        <CalendarGridBody>
          <CalendarGridRow
            v-for="(row, index) in month.rows"
            :key="`row-${index}`"
            class="grid grid-cols-7"
          >
            <CalendarCell
              v-for="day in row"
              :key="`${index}-${day.toString()}`"
              :date="day"
              class="relative text-center text-sm"
            >
              <CalendarCellTrigger
                as="button"
                :day
                :month="month.value"
                class="
                  flex size-9 cursor-pointer items-center justify-center
                  rounded-md text-sm whitespace-nowrap
                  transition-(--transition-button) outline-none
                  hover:bg-neutral-200
                  data-outside-view:opacity-25
                  data-selected:border-2 data-selected:border-primary-600
                  data-today:bg-primary-200 data-today:hover:bg-primary-300
                  data-unavailable:pointer-events-none
                  data-unavailable:line-through data-unavailable:opacity-25
                  dark:hover:bg-neutral-800
                  dark:data-selected:border-primary-500
                  dark:data-today:bg-primary-800
                  dark:data-today:hover:bg-primary-700
                "
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
