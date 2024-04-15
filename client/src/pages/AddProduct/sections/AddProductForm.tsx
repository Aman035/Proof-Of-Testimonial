import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Loader } from '../../../components'
import { useState } from 'react'
import { useWalletClient } from 'wagmi'
import { config } from '../../../config'
import { useNavigate } from 'react-router-dom'
import { createAttestation, createOffChainClient } from '../../../helpers/signX'

type Data = {
  name: string
  url: string
  about: string
  logo: string
  category: string
}

const categories = [
  'Attestation',
  'Blockchain',
  'CeFi',
  'DAO',
  'DeFi',
  'Gaming',
  'Governance',
  'Identity',
  'Infrastructure',
  'Marketplace',
  'NFT',
  'Oracle',
  'Privacy',
  'Social',
  'Storage',
  'Wallet',
]

const AddProductForm = () => {
  const [product, setProduct] = useState<Data>({
    name: '',
    url: '',
    about: '',
    logo: '',
    category: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const walletClient = useWalletClient()

  const handleproductPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProduct((product) => ({
          ...product,
          logo: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      setError(false)
      setSaving(true)

      if (product.name.length < 3) {
        setError(true)
        setSaving(false)
        return
      }

      // /**
      //  * PREPARE CUSTOM SIGNER FOR OFF-CHAIN SIGNING
      //  */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customSigner: any = walletClient.data
      customSigner.address = walletClient.data?.account.address

      const client = createOffChainClient(customSigner)

      setLoading(true)

      const { attestationId } = await createAttestation(
        config.productSchemaId,
        client,
        {
          name: product.name,
          about: product.about,
          logo: product.logo,
          url: product.url,
          category: product.category,
        },
        null,
        product.name
      )

      // await for 15 sec
      // attestations tak some time to be indexed
      await new Promise((resolve) => setTimeout(resolve, 15000))

      setLoading(false)
      setSaving(false)
      navigate('/product/' + attestationId)
    } catch (error) {
      console.error('Error creating product:', error)
      setSaving(false)
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <>
      <form
        className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Product
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name <span className="text-red-400">*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="product name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Proof Of Testimonials"
                      value={product.name}
                      onChange={(e) =>
                        setProduct((product) => ({
                          ...product,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {error && (
                  <p className="mt-3 text-sm text-red-600">
                    Name must be at least 3 characters long
                  </p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="URL"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  URL
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="URL"
                      id="URL"
                      autoComplete="product URL"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="https://google.com"
                      value={product.url}
                      onChange={(e) =>
                        setProduct((product) => ({
                          ...product,
                          url: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    value={product.about}
                    onChange={(e) =>
                      setProduct((product) => ({
                        ...product,
                        about: e.target.value,
                      }))
                    }
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Write a few sentences about the product.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Logo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {product.logo ? (
                    <img
                      src={product.logo}
                      alt="product"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 cursor-pointer">
                    Change
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleproductPhotoChange}
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    value={product.category}
                    onChange={(e) =>
                      setProduct((product) => ({
                        ...product,
                        category: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {saving ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </>
  )
}

export default AddProductForm
