import { useQuery } from '@apollo/client'
import { isEligible } from './queries'
/**
 * THIS FILE CONTAINS CUSTOM REACT HOOKS
 * All react are internaly using useQuery and useMutation hooks from @apollo/client
 * Note - React hoooks name should always start with use
 */

export const useIsEligible = (address: string) => {
  const { data, loading, error } = useQuery(isEligible, {
    variables: { address },
  })
  return {
    data: data?.checkWhitelistEligibility,
    loading,
    error,
  }
}
