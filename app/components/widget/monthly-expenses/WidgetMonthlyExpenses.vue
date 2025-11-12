<script setup lang="ts">
import { useMonthCategoriesQuery } from '~/composables/queries/month-categories'

const { formatPeriod } = useLocaleFormatter()

const now = new Date()

const currentPeriod = computed(() => formatPeriod({
  month: now.getMonth() + 1,
  year: now.getFullYear(),
}))

const { state } = useMonthCategoriesQuery(currentPeriod)

const categories = computed(() => state.value.data?.expenseCategories.toSorted(
  (a, b) => b.subtotal - a.subtotal
) ?? [])

const subtotalMax = computed(() => categories.value[0]?.subtotal ?? 0)
</script>

<template>
  <WidgetBase :title="$ts('sidebar.currentMonth')">
    <div class="flex flex-col gap-4">
      <WidgetMonthlyExpensesCategory
        v-for="category in categories"
        :key="category.id"
        v-bind="category"
        :subtotal-max
      />
    </div>
  </WidgetBase>
</template>
