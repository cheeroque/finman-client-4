import { LazyTransactionDialog } from '#components'

export function useTransactionDialog() {
  const { register } = useDialog()

  return register(LazyTransactionDialog)
}
