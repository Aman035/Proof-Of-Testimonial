import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components'
import { useEffect, useState } from 'react'
import { getAttestations } from '../../helpers/signX'
import { config } from '../../config'

type Product = {
  name: string
  url: string
  logo: string
  category: string
}
const Protocols = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [indexingValue, setIndexingValue] = useState('')
  const [inputValue, setInputValue] = useState('') // Local state to hold the input value
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const size = 100 // Hardcoded in signX index service

  useEffect(() => {
    setLoading(true)
    getAttestations(
      config.productSchemaId,
      page,
      indexingValue || undefined
    ).then((AttestationInfo) => {
      setTotal(AttestationInfo.total)
      setProducts(
        AttestationInfo.rows.map((attestation) => JSON.parse(attestation.data))
      )
      setLoading(false)
    })
  }, [indexingValue, page])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value) // Just update the local input value
  }

  const executeSearch = () => {
    setPage(1) // Reset to first page with new search term
    setIndexingValue(inputValue) // Set the indexing value to trigger the search
  }

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1)
  }

  if (loading) return <Loader />

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="flex gap-2 mb-10">
        <input
          type="text"
          placeholder="Search..."
          className="flex-auto rounded-md border border-gray-300 px-4 py-2 text-sm leading-6 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          value={inputValue}
          onChange={handleSearchChange}
        />
        <button
          onClick={executeSearch}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
        >
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {products.map((protocol) => (
          <li
            key={protocol.url}
            className="flex justify-between gap-x-6 py-5 px-4 border border-gray-200 rounded-lg hover:scale-105 transition-transform duration-150 hover:cursor-pointer"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-md bg-gray-50"
                src={protocol.logo}
                alt={`${protocol.name} logo`}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {protocol.name}
                </p>
                <a
                  href={protocol.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 truncate text-xs leading-5 text-blue-500 hover:text-blue-600"
                >
                  Visit Website
                </a>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {protocol.category}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end space-x-4">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-300"
          >
            Previous Page
          </button>
        )}
        {page * size < total && (
          <button
            onClick={handleNextPage}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Next Page
          </button>
        )}
      </div>

      <button
        onClick={() => navigate('/add-product')}
        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 fixed bottom-16 right-10"
      >
        <PlusIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  )
}

export default Protocols
