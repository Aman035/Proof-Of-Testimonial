import { PlusIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'

const protocols = [
  {
    name: 'Ethereum',
    url: 'https://ethereum.org',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    category: 'Blockchain Platform',
  },
  {
    name: 'Chainlink',
    url: 'https://chain.link',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    category: 'Oracles',
  },
  {
    name: 'Filecoin',
    url: 'https://filecoin.io',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    category: 'Decentralized Storage',
  },
  {
    name: 'Aave',
    url: 'https://aave.com',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    category: 'DeFi',
  },
  {
    name: 'Uniswap',
    url: 'https://uniswap.org',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    category: 'Decentralized Exchange',
  },
]

const Protocols = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <ul role="list" className="divide-y divide-gray-100">
        {protocols.map((protocol) => (
          <li key={protocol.url} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
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
