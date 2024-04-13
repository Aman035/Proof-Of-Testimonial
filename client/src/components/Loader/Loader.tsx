import { grid } from 'ldrs'
grid.register()

const Loader = () => {
  return (
    <div className="grid min-h-full place-items-center justify-center px-6 py-24 sm:py-32 lg:px-12">
      <div className="text-center">
        <l-grid size={130} color={'#4f46e5'}></l-grid>
      </div>
    </div>
  )
}

export default Loader
