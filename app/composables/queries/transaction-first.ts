import type { Transaction } from '~~/shared/types/transaction'

export const useTransactionFirstQuery = () => useQuery<Transaction>({
  key: ['transaction-first'],
  query: () => useRequestFetch()('/api/transactions/first'),
})
