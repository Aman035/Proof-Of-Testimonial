import { useParams } from 'react-router-dom'
import { Loader } from '../../components'
import { useAccount } from 'wagmi'

import { useEffect, useState } from 'react'
import { UserCircleIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { getLatestAttestation } from '../../helpers/signX'
import { config } from '../../config'
import { AttestationInfo } from '@ethsign/sp-sdk/dist/types/indexService'
import { useNavigate } from 'react-router-dom'

type Data = {
  userName: string
  about: string
  photo: string
  coverPhoto: string
  attestationId?: string | null
}

const Profile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Data>({
    userName: '',
    about: '',
    photo: '',
    coverPhoto: '',
    attestationId: null,
  })
  const { isConnected, address: connectedAddress } = useAccount()
  const { address } = useParams<{ address: string }>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLatestAttestation(config.profileSchemaId, address as string).then(
      (attestation: AttestationInfo | null) => {
        if (attestation) {
          setProfile(JSON.parse(attestation.data))
          setProfile((profile) => ({
            ...profile,
            attestationId: attestation.id,
          }))
          setLoading(false)
        } else {
          // Redirect to create profile
          if (isConnected && address === connectedAddress)
            navigate('/edit-profile')
          else navigate('/404')
        }
      }
    )
  }, [address, connectedAddress, isConnected, navigate])

  if (loading) return <Loader />

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 relative">
      <div>
        {profile.coverPhoto ? (
          <img
            src={profile.coverPhoto}
            alt="Cover"
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-48 rounded-lg bg-gray-200">
            <PhotoIcon className="h-12 w-12 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <div className="-mt-14 px-4">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="h-28 w-28 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <UserCircleIcon
              className="h-24 w-24 text-gray-300 border-4 border-white rounded-full"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <h1 className="text-2xl font-semibold leading-9 text-gray-900">
          {profile.userName}
        </h1>
        <h3 className="text-base font-semibold leading-9 text-gray-900 text-right">
          Gitcoin Profile Score : 100
        </h3>
        <div className="col-span-2">
          <p className="text-sm text-gray-600">{profile.about}</p>
        </div>
      </div>

      <div className="mt-20 text-center">
        {isConnected && connectedAddress === address && (
          <button
            className="rounded-md bg-indigo-600 mx-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => navigate(`/edit-profile`)}
          >
            Edit Profile
          </button>
        )}
        <a
          href={`https://testnet-scan.sign.global/attestation/${profile.attestationId}`}
          target="_blank"
        >
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            View Attestation
          </button>
        </a>
      </div>
    </div>
  )
}

export default Profile
