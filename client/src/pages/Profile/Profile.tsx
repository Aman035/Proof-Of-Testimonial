import { useParams } from 'react-router-dom'
import { ConnectWarn } from '../../components'
import { useAccount } from 'wagmi'

const Profile = () => {
  const { isConnected } = useAccount()
  const { address } = useParams<{ address: string }>()

  console.log('address', address)

  return (
    <>
      {!isConnected && <ConnectWarn />}
      <div>Profile Page for {address}</div>
    </>
  )
}

export default Profile
