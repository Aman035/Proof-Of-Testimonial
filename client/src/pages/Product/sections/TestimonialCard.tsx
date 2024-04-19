import { useEffect, useState } from 'react'
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from '@heroicons/react/24/outline'
import { useAccount, useWalletClient } from 'wagmi'
import { config } from '../../../config'
import {
  createAttestation,
  createOffChainClient,
  getAttestation,
  getLatestAttestation,
} from '../../../helpers/signX'
import { DotLoader } from '../../../components'
import { useVoteTestimonial } from '../../../graphql/hooks'
import { getVotes } from '../../../helpers/vote'

type ITestimonialCard = {
  testimonialId: string
}

type Data = {
  userName: string
  about: string
  photo: string
  coverPhoto: string
  address: string
}

export const TestimonialCard = ({ testimonialId }: ITestimonialCard) => {
  const [testimonialText, setTestimonialText] = useState('')
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Data>({
    userName: '',
    about: '',
    photo: '',
    coverPhoto: '',
    address: '',
  })
  const [voteData, setVoteData] = useState({
    upvotes: 0,
    downvotes: 0,
    upvoted: false,
    downvoted: false,
  })
  const { isConnected, address: connectedAddress } = useAccount()

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
            address: testimonialAttestation.attester,
          })
        }

        const data = await getVotes(testimonialId, connectedAddress as string)

        setVoteData(data)
        setLoading(false)
      } catch (error) {
        alert('Error fetching testimonial data')
      }
    }
    fetchData()
  }, [connectedAddress, testimonialId])

  const walletClient = useWalletClient()
  const { createVote } = useVoteTestimonial()

  const handleUpvote = async () => {
    if (voteData.upvoted || !isConnected) return
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
        testimonialId,
        customSigner.address
      )
      setVoteData((data) => ({
        upvotes: data.upvotes + 1,
        upvoted: true,
        downvotes: data.downvoted ? data.downvotes - 1 : data.downvotes,
        downvoted: false,
      }))
      await createVote(attestationId)
    } catch (error) {
      alert('Error upvoting testimonial')
    }
  }

  const handleDownvote = async () => {
    if (voteData.downvoted || !isConnected) return
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
        testimonialId,
        customSigner.address
      )
      setVoteData((data) => ({
        upvotes: data.upvoted ? data.upvotes - 1 : data.upvotes,
        upvoted: false,
        downvotes: data.downvotes + 1,
        downvoted: true,
      }))
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
      <div className="flex justify-between items-center space-x-4 p-4">
        <div className="flex items-center space-x-4">
          <img
            className="h-12 w-12 rounded-full"
            src={profile.photo}
            alt={profile.userName}
          />
          <a
            href={`/profile/${profile.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h5 className="text-lg font-bold">{profile.userName}</h5>
          </a>
        </div>
        <div>
          <a
            href={`https://testnet-scan.sign.global/attestation/${testimonialId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="rounded-md bg-gray-300 px-4 py-2 text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
              View Attestation
            </button>
          </a>
        </div>
      </div>

      <p className="text-gray-500 text-sm px-4">{testimonialText}</p>
      <div className="flex justify-between items-center space-x-4 px-4">
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center space-x-2"
            onClick={handleUpvote}
            disabled={!isConnected || voteData.upvoted}
          >
            <ArrowUpCircleIcon
              className={`h-6 w-6 ${
                !isConnected || voteData.upvoted
                  ? 'text-blue-500'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            />
            <span>{voteData.upvotes}</span>
          </button>
          <button
            className="flex items-center space-x-2"
            onClick={handleDownvote}
            disabled={!isConnected || voteData.downvoted}
          >
            <ArrowDownCircleIcon
              className={`h-6 w-6 ${
                !isConnected || voteData.downvoted
                  ? 'text-red-500'
                  : 'text-gray-500 hover:text-red-500'
              }`}
            />
            <span>{voteData.downvotes}</span>
          </button>
        </div>
        {!isConnected && (
          <h3 className="text-right flex-1 text-yellow-500">
            Connect wallet to vote
          </h3>
        )}
      </div>
    </div>
  )
}

export default TestimonialCard
