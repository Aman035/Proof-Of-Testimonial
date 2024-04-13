import { ConnectWarn } from '../../components/'
import { useAccount } from 'wagmi'
import EditProfileForm from './sections/EditProfileForm'

const EditProfile = () => {
  const { isConnected } = useAccount()

  return (
    <>
      {!isConnected && <ConnectWarn />}
      {isConnected && <EditProfileForm />}
    </>
  )
}

export default EditProfile
