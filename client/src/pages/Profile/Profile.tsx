import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader } from '../../components'
import { useAccount, useReadContract } from 'wagmi'
import {
  UserCircleIcon,
  PhotoIcon,
  CheckBadgeIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid'
import { getLatestAttestation } from '../../helpers/signX'
import { config } from '../../config'
import { AttestationInfo } from '@ethsign/sp-sdk/dist/types/indexService'
import {
  useClaimReward,
  useIsEligible,
  useWhitelistUser,
} from '../../graphql/hooks'

type Data = {
  userName: string
  about: string
  photo: string
  coverPhoto: string
  attestationId?: string | null
}

const Profile = () => {
  const navigate = useNavigate()
  const { isConnected, address: connectedAddress } = useAccount()
  const { address } = useParams<{ address: string }>()
  const [profile, setProfile] = useState<Data>({
    userName: '',
    about: '',
    photo: '',
    coverPhoto: '',
    attestationId: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const attestation = (await getLatestAttestation(
        config.profileSchemaId,
        address as string
      )) as AttestationInfo | null
      if (attestation) {
        setProfile({
          ...JSON.parse(attestation.data),
          attestationId: attestation.id,
        })
        setLoading(false)
      } else if (isConnected && address === connectedAddress) {
        navigate('/edit-profile')
      } else {
        navigate('/404')
      }
    }
    fetchData()
  }, [address, connectedAddress, isConnected, navigate])

  const isWhitelisted = useReadContract({
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'isWhitelisted',
    args: [address],
  })

  const tokenBalance = useReadContract({
    abi: config.tokenAbi,
    address: config.tokenContractAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [address],
  })

  const [whitelistingDone, setWhitelistingDone] = useState(false)
  const { data: eligibilityData } = useIsEligible(address as string)
  const { loading: loadingWhitelist, getWhitelist } = useWhitelistUser()
  const { loading: loadingClaimReward, claim } = useClaimReward()

  const rewards = useReadContract({
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'getRewardPool',
    args: [address],
  })

  const [rewardsClaimed, setRewardsClaimed] = useState(false)

  const formattedTokenBalance =
    tokenBalance.data !== undefined
      ? `${(BigInt(tokenBalance.data as number) / BigInt(1e18)).toString()} POT`
      : 'Loading...'

  const formattedRewards =
    rewards.data !== undefined
      ? `${(BigInt(rewards.data as number) / BigInt(1e18)).toString()} POT`
      : `Loading...`

  const showClaimRewards =
    rewards.data !== undefined &&
    BigInt(rewards.data as number) / BigInt(1e18) >= 50

  if (loading) return <Loader />

  const StatusLabel = () => {
    if (!isWhitelisted || !eligibilityData) return null
    return (
      <>
        {isWhitelisted.data === true || whitelistingDone ? (
          <CheckBadgeIcon className="h-7 w-7 text-green-500" />
        ) : eligibilityData.isEligible ? (
          <button
            disabled={loadingWhitelist}
            className="bg-indigo-600 text-white font-medium px-3 py-1 rounded hover:bg-indigo-500 flex items-center gap-1 relative"
            onClick={async () => {
              await getWhitelist(address as string)
              setWhitelistingDone(true)
            }}
          >
            {loadingWhitelist ? 'Whitelisting...' : 'Get Whitelisted'}
          </button>
        ) : (
          <div className="relative group">
            <XCircleIcon className="h-7 w-7 text-red-500" />
            <div className="absolute hidden group-hover:block w-60 bg-black text-white text-center text-xs rounded-lg py-2 px-3">
              Not eligible for whitelisting, Gitcoin Passport score is less than
              1
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 relative">
      <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
        {profile.coverPhoto ? (
          <img
            src={profile.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <PhotoIcon
            className="m-auto text-gray-400 h-24 w-24"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="-mt-16 px-4 flex justify-center">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-white object-cover"
          />
        ) : (
          <UserCircleIcon
            className="h-24 w-24 text-gray-300 border-4 border-white rounded-full"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {profile.userName}
          </h1>
          <StatusLabel />
        </div>
        <div>
          {tokenBalance.data !== undefined && (
            <h2 className="text-lg font-medium">
              Balance :) {formattedTokenBalance}
            </h2>
          )}
        </div>
      </div>
      <p className="text-gray-600">{profile.about}</p>
      <div className="mt-10 text-center space-x-4">
        {isConnected && connectedAddress === address && (
          <button
            className="rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => navigate(`/edit-profile`)}
          >
            Edit Profile
          </button>
        )}
        <a
          href={`https://testnet-scan.sign.global/attestation/${profile.attestationId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="rounded-md bg-gray-300 px-4 py-2 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
            View Attestation
          </button>
        </a>
      </div>
      <div className="mt-16 flex flex-col sm:flex-row justify-center items-center">
        {rewards.data !== undefined && (
          <h2 className="text-lg font-semibold flex items-center gap-2 mx-3">
            Current Rewards : {rewardsClaimed ? 0 : formattedRewards}
          </h2>
        )}
        {showClaimRewards && !rewardsClaimed && (
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded mx-3"
            disabled={loadingClaimReward}
            onClick={async () => {
              await claim(address as string)
              setRewardsClaimed(true)
            }}
          >
            {loadingClaimReward ? 'Claiming' : 'Claim Rewards'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Profile
