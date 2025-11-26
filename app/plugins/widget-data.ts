// Await for useAsyncData calls used in widgets to avoid hydration errors

export default defineNuxtPlugin(async () => {
  await Promise.all([
    useCurrentMonthTransactions(),
    useTransactionDates(),
    useLatestSnapshot(),
  ])
})
