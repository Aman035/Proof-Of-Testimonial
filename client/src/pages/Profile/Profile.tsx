import ConnectWarn from './sections/ConnectWarn'
import { useAccount } from 'wagmi'
import EditProfile from './sections/EditProfile'
import { useEffect, useState } from 'react'
import { AttestationInfo } from '@ethsign/sp-sdk/dist/types/indexService'
import { IndexService } from '@ethsign/sp-sdk'
import { getLatestAttestation } from '../../helpers/signX'
import { config } from '../../config'

const Profile = () => {
  const { isConnected, address } = useAccount()
  const [latestAttestation, setLatestAttestaion] =
    useState<null | AttestationInfo>(null)

  useEffect(() => {
    if (isConnected) {
      getLatestAttestation(config.profileSchemaId, address as string).then(
        (attestation: AttestationInfo | null) => {
          setLatestAttestaion(attestation)
        }
      )
    }
  }, [isConnected])

  return (
    <>
      {!isConnected && <ConnectWarn />}
      {isConnected && latestAttestation === null && <EditProfile />}
    </>
  )
}

export default Profile
