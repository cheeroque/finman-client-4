import type { AsyncDataRequestStatus } from '#app'

export function useAsyncDataLoading(status: MaybeRef<AsyncDataRequestStatus>) {
  return computed(() => ['idle', 'pending'].includes(toValue(status)))
}
