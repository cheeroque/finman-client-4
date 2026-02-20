// Await for useAsyncData calls used in widgets to avoid hydration errors

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn) {
    return
  }

  await Promise.all([
    useCurrentMonthTransactions(),
    useTransactionDates(),
    useLatestSnapshot(),
  ])
})
