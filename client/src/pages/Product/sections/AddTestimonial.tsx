import React, { useState } from 'react'
import { useAccount, useReadContract, useWalletClient } from 'wagmi'
import { config } from '../../../config'
import { DotLoader, ConnectWarn } from '../../../components'
import { createAttestation, createOffChainClient } from '../../../helpers/signX'
import { useAddTestimonial } from '../../../graphql/hooks'

type IAddTestimonial = {
  productAttestationId: string
}

export const AddTestimonial = ({ productAttestationId }: IAddTestimonial) => {
  const { isConnected, address } = useAccount()
  const [testimonial, setTestimonial] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { createTestimonial } = useAddTestimonial()
  const walletClient = useWalletClient()

  const { data: isWhitelisted } = useReadContract({
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'isWhitelisted',
    args: [address],
  })

  if (!isConnected) {
    return (
      <ConnectWarn
        message="Please connect your wallet to add testimonial"
        padding="MINIMAL"
      />
    )
  }

  if (isWhitelisted === undefined) {
    return <DotLoader />
  }

  if (isWhitelisted === false) {
    return (
      <div className="p-4 max-w-md mx-auto bg-red-100 text-red-700 border border-red-200 rounded text-center">
        You are not whitelisted to add a testimonial.
      </div>
    )
  }

  const handleTestimonialChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTestimonial(e.target.value)
  }

  const submitTestimonial = async () => {
    setSubmitting(true)
    try {
      /**
       * PREPARE CUSTOM SIGNER FOR OFF-CHAIN SIGNING
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customSigner: any = walletClient.data
      customSigner.address = walletClient.data?.account.address

      const client = createOffChainClient(customSigner)

      const { attestationId: testimonialAttestationId } =
        await createAttestation(
          config.testimonialSchemaId,
          client,
          {
            text: testimonial,
          },
          productAttestationId,
          customSigner.address
        )
      // await for 10 sec
      // attestations tak some time to be indexed
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await createTestimonial(testimonialAttestationId)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      // refresh page
      window.location.reload()
    } catch (err) {
      alert('Error submitting testimonial')
    }

    setTestimonial('')
    setSubmitting(false)
  }

  return (
    <div className="sm:rounded-lg mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 my-10">
      <textarea
        className="w-full p-2 border border-gray-300 rounded resize-none"
        rows={4}
        placeholder="Write your testimonial..."
        value={testimonial}
        onChange={handleTestimonialChange}
      />
      <button
        disabled={testimonial === '' || submitting}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
        onClick={submitTestimonial}
      >
        {submitting ? 'Submiting' : 'Sumbit'}
      </button>
    </div>
  )
}

export default AddTestimonial
