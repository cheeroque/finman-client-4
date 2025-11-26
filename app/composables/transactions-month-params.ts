export function useMonthTransactionsParams() {
  const route = useRoute()

  const period = computed(() => route.params.period as string)

  const asyncDataKey = computed(() => [
    'transactions-month',
    period.value,
  ].join('::'))

  return {
    asyncDataKey,
    period,
  }
}
