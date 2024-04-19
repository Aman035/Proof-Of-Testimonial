import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type IConnectWarn = {
  message?: string
  padding?: 'MINIMAL' | 'NORMAL'
}

export default function ConnectWarn({
  message = 'Sorry, we couldn’t find any connected wallet. Please connect your wallet to continue',
  padding = 'NORMAL',
}: IConnectWarn) {
  // Determine the padding classes based on the padding prop
  const paddingClasses =
    padding === 'MINIMAL' ? 'py-2 sm:py-4' : 'py-24 sm:py-32'

  return (
    <div
      className={`grid min-h-full place-items-center justify-center bg-white px-6 ${paddingClasses} lg:px-8`}
    >
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-yellow-600"
            aria-hidden="true"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          Connect Your Wallet
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">{message}</p>
      </div>
    </div>
  )
}
