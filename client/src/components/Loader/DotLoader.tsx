import { dotStream } from 'ldrs'
dotStream.register()

const DotLoader = () => {
  return (
    <div className="grid place-items-center justify-center px-6 py-2 sm:py-4 lg:px-6">
      <div className="text-center">
        <l-dot-stream size={90} color={'#4f46e5'}></l-dot-stream>
      </div>
    </div>
  )
}

export default DotLoader
