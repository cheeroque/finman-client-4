export function useCategoryDelete() {
  return useDefineMutation<number>((id) => $fetch(`/api/categories/${id}`, {
    method: 'DELETE',
  }))
}
