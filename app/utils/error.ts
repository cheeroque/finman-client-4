export function getErrorMessage(error: unknown, fallbackMessage: string) {
  const message = error instanceof Error ? error.message : undefined

  return message || fallbackMessage
}
