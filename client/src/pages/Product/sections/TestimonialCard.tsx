import { useEffect, useState } from 'react'
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from '@heroicons/react/24/outline'
import { useAccount, useReadContract, useWalletClient } from 'wagmi'
import { config } from '../../../config'
import {
  createAttestation,
  createOffChainClient,
  getAttestation,
  getLatestAttestation,
} from '../../../helpers/signX'
import { DotLoader } from '../../../components'
import { useVoteTestimonial } from '../../../graphql/hooks'

type ITestimonialCard = {
  testimonialId: string
}

type Data = {
  userName: string
  about: string
  photo: string
  coverPhoto: string
  attestationId?: string | null
}

export const TestimonialCard = ({ testimonialId }: ITestimonialCard) => {
  const [testimonialText, setTestimonialText] = useState('')
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Data>({
    userName: '',
    about: '',
    photo: '',
    coverPhoto: '',
  })
  const [userUpvoted, setUserUpvoted] = useState(false)
  const [userDownvoted, setUserDownvoted] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const testimonialAttestation = await getAttestation(testimonialId)
        setTestimonialText(JSON.parse(testimonialAttestation.data).text)

        const profileAttestation = await getLatestAttestation(
          config.profileSchemaId,
          testimonialAttestation.attester
        )
        if (profileAttestation) {
          setProfile({
            ...JSON.parse(profileAttestation.data),
          })
        }

        setLoading(false)
      } catch (error) {
        alert('Error fetching testimonial data')
      }
    }
    fetchData()
  }, [testimonialId])

  const { isConnected, address: connectedAddress } = useAccount()
  const walletClient = useWalletClient()
  const { createVote } = useVoteTestimonial()

  const { data: upvoteData } = useReadContract({
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'getUpvotes',
    args: [testimonialId],
  })
  const upvotes = upvoteData ? (upvoteData as number) : 0

  const { data: downvoteData } = useReadContract({
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'getDownvotes',
    args: [testimonialId],
  })
  const downvotes = downvoteData ? (downvoteData as number) : 0

  const { isLoading: upvoteLoading, data: upvotedData } = useReadContract({
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'upvoted',
    args: [testimonialId, connectedAddress],
  })
  const upvoted = upvotedData ? (upvotedData as boolean) : false

  const { isLoading: downvoteLoading, data: downvotedData } = useReadContract({
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'downvoted',
    args: [testimonialId, connectedAddress],
  })
  const downvoted = downvotedData ? (downvotedData as boolean) : false

  const handleUpvote = async () => {
    if (upvoted || userUpvoted || !isConnected) return
    try {
      /**
       * PREPARE CUSTOM SIGNER FOR OFF-CHAIN SIGNING
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customSigner: any = walletClient.data
      customSigner.address = walletClient.data?.account.address

      const client = createOffChainClient(customSigner)

      const { attestationId } = await createAttestation(
        config.voteSchemaId,
        client,
        {
          vote: 'UPVOTE',
        },
        null,
        customSigner.address
      )
      setUserUpvoted(true)
      setUserDownvoted(false)
      // await for 10 sec
      // attestations tak some time to be indexed
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await createVote(attestationId)
    } catch (error) {
      alert('Error upvoting testimonial')
    }
  }

  const handleDownvote = async () => {
    if (downvoted || userDownvoted || !isConnected) return
    try {
      /**
       * PREPARE CUSTOM SIGNER FOR OFF-CHAIN SIGNING
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customSigner: any = walletClient.data
      customSigner.address = walletClient.data?.account.address

      const client = createOffChainClient(customSigner)

      const { attestationId } = await createAttestation(
        config.voteSchemaId,
        client,
        {
          vote: 'DOWNVOTE',
        },
        null,
        customSigner.address
      )
      setUserUpvoted(false)
      setUserDownvoted(true)
      // await for 10 sec
      // attestations tak some time to be indexed
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await createVote(attestationId)
    } catch (error) {
      alert('Error downvoting testimonial')
    }
  }

  if (loading) {
    return <DotLoader />
  }

  return (
    <div className="mt-8 max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4 space-y-4">
      <div className="flex items-center space-x-4 p-4">
        <img
          className="h-12 w-12 rounded-full"
          src={profile.photo}
          alt={profile.userName}
        />
        <h5 className="text-lg font-bold">{profile.userName}</h5>
      </div>
      <p className="text-gray-500 text-sm px-4">{testimonialText}</p>
      <div className="flex justify-start items-center space-x-4 px-4">
        <button
          className="flex items-center space-x-2"
          onClick={handleUpvote}
          disabled={!isConnected || upvoted || upvoteLoading || userUpvoted}
        >
          <ArrowUpCircleIcon
            className={`h-6 w-6 ${
              !isConnected || upvoted || upvoteLoading || userUpvoted
                ? 'text-blue-500'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          />
          <span>{userUpvoted ? upvotes + 1 : upvotes}</span>
        </button>
        <button
          className="flex items-center space-x-2"
          onClick={handleDownvote}
          disabled={
            !isConnected || downvoted || downvoteLoading || userDownvoted
          }
        >
          <ArrowDownCircleIcon
            className={`h-6 w-6 ${
              !isConnected || downvoted || downvoteLoading || userDownvoted
                ? 'text-red-500'
                : 'text-gray-500 hover:text-red-500'
            }`}
          />
          <span>{userDownvoted ? downvotes + 1 : downvotes}</span>
        </button>
      </div>
    </div>
  )
}

export default TestimonialCard
