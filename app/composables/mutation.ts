type MutationFn<TInput> = (input: TInput) => Promise<void>

export function useDefineMutation<TInput>(handler: MutationFn<TInput>, refreshKeys?: string[]) {
  const loading = ref(false)

  const execute = async (input: TInput) => {
    loading.value = true

    try {
      await handler(input)

      await refreshNuxtData(refreshKeys)
    } finally {
      loading.value = false
    }
  }

  return {
    execute,
    loading,
  }
}
