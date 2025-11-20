import { useTransactionFirstQuery } from '~/composables/queries/transaction-first'

export function useMonthSelector() {
  const query = useTransactionFirstQuery()

  const { parseDateTime } = useLocaleFormatter()

  const now = new Date()

  const end = computed(() => parseDateTime(now))
  const start = computed(() => query.state.value.data?.created_at
    ? parseDateTime(query.state.value.data.created_at)
    : end.value
  )

  return {
    ...query,
    end,
    start,
  }
}
