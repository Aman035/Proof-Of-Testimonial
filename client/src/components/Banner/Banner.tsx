import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

type IBannerProps = {
  text: string
}
const Banner = ({ text }: IBannerProps) => {
  const [show, setShow] = useState(true)
  return (
    <>
      {show ? (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-indigo-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 rounded-tl-lg rounded-tr-lg">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-white">
              <strong className="font-semibold">{text}</strong>
            </p>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={() => setShow(false)}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Banner
