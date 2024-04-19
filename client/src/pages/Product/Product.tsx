import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GridLoader } from '../../components'
import { useNavigate } from 'react-router-dom'
import { getAttestation } from '../../helpers/signX'
import { useReadContract } from 'wagmi'
import { config } from '../../config'
import AddTestimonial from './sections/AddTestimonial'
import TestimonialCard from './sections/TestimonialCard'
interface Product {
  name: string
  about: string
  url: string
  logo: string
  category: string
}

const Product = () => {
  const { attestationId } = useParams<{ attestationId: string }>() // Capture the attestationId from the route
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const { data } = useReadContract({
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'getTestimonials',
    args: [attestationId],
  })

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true)
      try {
        const { data } = await getAttestation(attestationId as string)
        setProduct(JSON.parse(data))
      } catch (error) {
        navigate('/404') // Redirect to 404 page if there is an error
      }
      setLoading(false)
    }

    if (attestationId) {
      fetchProductDetails()
    }
  }, [attestationId, navigate])

  if (loading || !product) {
    return <GridLoader />
  }

  return (
    <>
      <div className="shadow overflow-hidden sm:rounded-lg mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 my-10">
        <div className="px-4 py-5 sm:px-6 flex items-center space-x-4">
          <img
            src={product.logo}
            alt={`${product.name} Logo`}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {product.category}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.about}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-blue-500 hover:text-blue-700 sm:mt-0 sm:col-span-2">
                <a href={product.url} target="_blank" rel="noopener noreferrer">
                  {product.url}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <AddTestimonial productAttestationId={attestationId as string} />
      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 my-10">
        {data &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data as any).map((testimonialId: string, index: number) => (
            <TestimonialCard testimonialId={testimonialId} key={index} />
          ))}
      </div>
    </>
  )
}

export default Product
