export function useCategoryTransactionsQueryParams() {
  const page = useRouteQuery('page', '1', {
    mode: 'push',
    transform: Number,
  })

  return {
    page,
  }
}
