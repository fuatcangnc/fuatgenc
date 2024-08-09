import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/actions/category.actions'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const result = await getCategories()
      if (result.error) {
        throw new Error(result.error)
      }
      return result.categories
    },
  })
}