import { LazyCategoryModal } from '#components'

export function useCategoryModal() {
  const overlay = useOverlay()

  const categoryModal = overlay.create(LazyCategoryModal)

  return categoryModal
}
