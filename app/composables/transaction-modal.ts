import { LazyTransactionModal } from '#components'

export function useTransactionModal() {
  const overlay = useOverlay()

  const transactionModal = overlay.create(LazyTransactionModal)

  return transactionModal
}
