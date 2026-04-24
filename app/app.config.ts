export default defineAppConfig({
  categoryTransactionsPerPage: 18,
  inputDebounce: 500,
  toastDuration: {
    danger: 10_000,
    success: 3000,
    warning: 5000,
  },
  tokenCookieName: 'FM4:ACCESS_TOKEN',
})
