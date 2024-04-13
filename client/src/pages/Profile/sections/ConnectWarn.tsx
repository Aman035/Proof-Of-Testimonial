import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ConnectWarn() {
  return (
    <div className="grid min-h-full place-items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
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
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find any connected wallet. Please connect your
          wallet to continue.
        </p>
      </div>
    </div>
  )
}
