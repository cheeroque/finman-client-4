export default defineEventHandler(async () => {
  const apiFetch = useApiFetch()
  const { staticBase } = useRuntimeConfig()

  const filePath = await apiFetch<string>('/transactions/export')

  return `${staticBase}${filePath}`
})
