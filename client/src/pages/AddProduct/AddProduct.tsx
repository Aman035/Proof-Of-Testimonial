import { ConnectWarn } from '../../components/'
import { useAccount } from 'wagmi'
import AddProductForm from './sections/AddProductForm'

const AddProduct = () => {
  const { isConnected } = useAccount()

  return (
    <>
      {!isConnected && <ConnectWarn />}
      {isConnected && <AddProductForm />}
    </>
  )
}

export default AddProduct
