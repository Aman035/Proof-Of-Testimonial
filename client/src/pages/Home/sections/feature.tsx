import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Verified Testimonials',
    description:
      'Users can provide testimonials and reviews for various products, all of which are verified on-chain, ensuring authenticity and trustworthiness.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Spam & Bot Prevention',
    description:
      'Implement robust spam and bot prevention mechanisms. User profiles are assigned scores based on Gitcoin Passport, ensuring genuine interactions.',
    icon: UserGroupIcon,
  },
  {
    name: 'Get incentivized for providing testimonials',
    description:
      'Earn rewards for contributing genuine testimonials and reviews. Encourage trust and participation within the community while receiving incentives.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Grow products with trust',
    description:
      'Foster product growth by building trust through genuine testimonials and reviews. Increase customer confidence and loyalty through transparent verification processes.',
    icon: ArrowTrendingUpIcon,
  },
]

export default function Feature() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Proof Of Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Empowering Trust & Authenticity
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to Proof Of Testimonials, where trust is built on-chain. Our
            platform ensures genuine testimonials and reviews for various
            products, verified and secured using <b>SignX Attestations</b>
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
