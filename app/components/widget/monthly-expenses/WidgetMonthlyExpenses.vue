<script setup lang="ts">
import { useMonthCategoriesQuery } from '~/composables/queries/month-categories'

const { limit = 5 } = defineProps<{
  limit?: number
}>()

const { formatPeriod } = useLocaleFormatter()

const now = new Date()

const currentPeriod = computed(() => formatPeriod({
  month: now.getMonth() + 1,
  year: now.getFullYear(),
}))

const { state } = useMonthCategoriesQuery(currentPeriod)

const categories = computed(() => state.value.data?.expenseCategories ?? [])

const visibleCategories = computed(() => categories.value.slice(0, limit))
const otherCategoriesTotal = computed(() => categories.value
  .slice(limit)
  .reduce((total, { subtotal }) => total += subtotal, 0)
)

const subtotalMax = computed(() => Math.max(
  visibleCategories.value[0]?.subtotal ?? 0,
  otherCategoriesTotal.value
))
</script>

<template>
  <WidgetBase :title="$ts('sidebar.currentMonth.title')">
    <div class="flex flex-col gap-4">
      <WidgetMonthlyExpensesCategory
        v-for="category in visibleCategories"
        :key="category.id"
        v-bind="category"
        :subtotal-max
      />

      <WidgetMonthlyExpensesCategory
        color="var(--c-primary)"
        :link="`/months/${currentPeriod}`"
        :name="$ts('sidebar.currentMonth.otherExpenses')"
        :subtotal="otherCategoriesTotal"
        :subtotal-max
      />
    </div>
  </WidgetBase>
</template>
