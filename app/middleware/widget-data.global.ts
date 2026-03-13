export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const snapshotStore = useSnapshotStore()
  const transactionStore = useTransactionStore()

  if (!authStore.isLoggedIn) {
    return
  }

  await Promise.all([
    snapshotStore.fetchLatest(),
    transactionStore.fetchCurrentMonth(),
    transactionStore.fetchDates(),
  ])
})
