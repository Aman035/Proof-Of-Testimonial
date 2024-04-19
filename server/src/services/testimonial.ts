import { writeContract } from '../helpers/contract'
import { getAttestation } from '../helpers/signX'

export const addTestimonial = async (testimonialAttestationId: string) => {
  const attestion = await getAttestation(testimonialAttestationId)
  if (!attestion) {
    throw new Error('Testimonial Attestation not found')
  }
  const attester = attestion.attester
  const productAttestationId = attestion.linkedAttestation
  const productAttestation = await getAttestation(productAttestationId)
  if (!productAttestation) {
    throw new Error('Product Attestation not found')
  }
  //todo: throw error is attestation is too old

  return await writeContract('addTestimonial', [
    testimonialAttestationId,
    attester,
    productAttestationId,
  ])
}

export const voteTestimonial = async (voteAttestationId: string) => {
  // wait for 15 sec
  // attestations take some time to be indexed
  await new Promise((resolve) => setTimeout(resolve, 15000))
  const attestion = await getAttestation(voteAttestationId)
  if (!attestion) {
    throw new Error('Vote Attestation not found')
  }
  const attester = attestion.attester
  const testimonialAttestationId = attestion.linkedAttestation
  const testimonialAttestation = await getAttestation(testimonialAttestationId)
  if (!testimonialAttestation) {
    throw new Error('Testimonial Attestation not found')
  }

  // todo: throw error is attestation is too old

  const upvote = JSON.parse(attestion.data).vote === 'UPVOTE'

  return upvote
    ? await writeContract('upvoteDelegate', [
        voteAttestationId,
        attester,
        testimonialAttestationId,
      ])
    : await writeContract('downvoteDelegate', [
        voteAttestationId,
        attester,
        testimonialAttestationId,
      ])
}
