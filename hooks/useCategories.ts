import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/actions/category.actions'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const result = await getCategories()
      if ('error' in result && typeof result.error === 'string') {
        throw new Error(result.error)
      }
      return result
    },
  })
}