import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Banner, GridLoader } from '../../../components'
import { useEffect, useState } from 'react'
import { useWalletClient } from 'wagmi'
import { config } from '../../../config'
import {
  createAttestation,
  createOffChainClient,
  getLatestAttestation,
} from '../../../helpers/signX'
import { AttestationInfo } from '@ethsign/sp-sdk/dist/types/indexService'
import { useNavigate } from 'react-router-dom'

type Data = {
  userName: string
  about: string
  photo: string
  coverPhoto: string
  lastAttestationId?: string | null
}

const EditProfileForm = () => {
  const [profile, setProfile] = useState<Data>({
    userName: '',
    about: '',
    photo: '',
    coverPhoto: '',
    lastAttestationId: null,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [saving, setSaving] = useState(false)
  const walletClient = useWalletClient()
  const navigate = useNavigate()

  useEffect(() => {
    if (walletClient.data?.account.address) {
      getLatestAttestation(
        config.profileSchemaId,
        walletClient.data?.account.address as string
      ).then((attestation: AttestationInfo | null) => {
        setLoading(false)
        if (attestation) {
          setProfile(JSON.parse(attestation.data))
          setProfile((profile) => ({
            ...profile,
            lastAttestationId: attestation.id,
          }))
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletClient.data?.account.address])

  const newProfile = profile.lastAttestationId === null

  const handleProfilePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile((profile) => ({
          ...profile,
          photo: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile((profile) => ({
          ...profile,
          coverPhoto: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      setError(false)
      setSaving(true)

      if (profile.userName.length < 3) {
        setError(true)
        setSaving(false)
        return
      }

      /**
       * PREPARE CUSTOM SIGNER FOR OFF-CHAIN SIGNING
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customSigner: any = walletClient.data
      customSigner.address = walletClient.data?.account.address

      const client = createOffChainClient(customSigner)

      setLoading(true)

      await createAttestation(
        config.profileSchemaId,
        client,
        {
          userName: profile.userName,
          about: profile.about,
          photo: profile.photo,
          coverPhoto: profile.coverPhoto,
        },
        profile.lastAttestationId,
        customSigner.address
      )

      // await for 15 sec
      // attestations tak some time to be indexed
      await new Promise((resolve) => setTimeout(resolve, 15000))

      setLoading(false)

      setSaving(false)
      navigate('/profile/' + customSigner.address)
    } catch (error) {
      console.error('Error creating profile:', error)
      setSaving(false)
      setLoading(false)
    }
  }

  if (loading) return <GridLoader />

  return (
    <>
      {newProfile && <Banner text="New Profile Detected" />}
      <form
        className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username <span className="text-red-400">*</span>
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="John Doe"
                      value={profile.userName}
                      onChange={(e) =>
                        setProfile((profile) => ({
                          ...profile,
                          userName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {error && (
                  <p className="mt-3 text-sm text-red-600">
                    Username must be at least 3 characters long
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    value={profile.about}
                    onChange={(e) =>
                      setProfile((profile) => ({
                        ...profile,
                        about: e.target.value,
                      }))
                    }
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 cursor-pointer">
                    Change
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleProfilePhotoChange}
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {profile.coverPhoto ? (
                      <img
                        src={profile.coverPhoto}
                        alt="Cover"
                        className="w-full object-cover"
                      />
                    ) : (
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleCoverPhotoChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </>
  )
}

export default EditProfileForm
