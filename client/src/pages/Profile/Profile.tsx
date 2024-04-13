import ConnectWarn from './sections/ConnectWarn'
import { useAccount } from 'wagmi'
import EditProfile from './sections/EditProfile'

const Profile = () => {
  const { isConnected } = useAccount()
  return (
    <>
      {!isConnected && <ConnectWarn />}
      {isConnected && <EditProfile />}
    </>
  )
}

export default Profile
