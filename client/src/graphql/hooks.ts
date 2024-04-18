import { useMutation, useQuery } from '@apollo/client'
import { isEligible } from './queries'
import { whitelistUser, claimReward } from './mutations'
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

export const useWhitelistUser = () => {
  const [mutate, { loading }] = useMutation(whitelistUser)

  const getWhitelist = async (address: string) => {
    const { data } = await mutate({
      variables: { address },
    })
    return data?.whitelist
  }

  return { loading, getWhitelist }
}

export const useClaimReward = () => {
  const [mutate, { loading }] = useMutation(claimReward)

  const claim = async (address: string) => {
    const { data } = await mutate({
      variables: { address },
    })
    return data?.claimReward
  }

  return { loading, claim }
}
