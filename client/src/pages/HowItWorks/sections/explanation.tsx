import UserJourney from '../../../assets/userJourney.svg'

const Explanation = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-white py-24 sm:py-32">
      {/* Text content container */}
      <div className="lg:w-1/2">
        <div className="py-8 px-5 md:px-10 lg:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding the Authenticity Challenge
          </h2>
          <p className="text-lg text-gray-600">
            In the digital age, both web3 and traditional web2 platforms face
            challenges regarding the authenticity of product reviews and
            testimonials. With studies, such as the University of Baltimore's
            2021 research, indicating that up to 25% of online reviews could be
            misleading or fake, the credibility of these platforms is often
            questioned. This creates a significant trust gap for consumers
            seeking genuine product insights.
          </p>
          <p className="text-lg text-gray-600">
            Curently all the testimonials found for any web2 / web3 product have
            to be taken at face value. There is no way to verify if the
            testimonial was added by a real user or a bot and even if it was
            added by a real user, there is no way to verify if the user really
            gave the testimonial or if it was added by the product owners itself
            twising the words of the user. This is where Proof Of Testimonials
            comes in.
          </p>
        </div>
        <div className="py-8 px-5 md:px-10 lg:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Introducing 'Proof of Testimonials'
          </h2>
          <p className="text-lg text-gray-600">
            <b>Proof of Testimonials</b> allows users to add products they want
            reviewed. Users can also create their profiles, enhancing their
            credibility by linking their social media accounts and other
            platforms. All products and profiles are attested off-chain using
            SignX, which can be verified anytime outside the scope of the
            platform.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Proof of Testimonials also ensures bot resistance and safety against
            profile spoofing. <br />
            <b>Bot Resistance:</b> Every user profile must have a Threshold
            Gitcoin Passport Score to add a testimonial. This ensures that the
            user is real and not a bot. <br />( Note: The Threshold Gitcoin
            Passport Score can be set by the product owner and is currently set
            to 1 for the MVP demo. ) <br />
            <b>Profile Spoofing Detection:</b> Each user profile SignX
            attestation is linked to the previous profile attestation, thus
            forming a chain of attestations. This helps the platform detect any
            recent changes or spoofing in profiles.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Proof of Testimonials also ensures that users who add testimonials
            are rewarded for quality contributions and penalized for fake
            testimonials. This is managed through the following mechanisms:{' '}
            <br />
            <b>One-time Reward on Whitelist:</b> Users are minted{' '}
            <b>1000 POT</b>
            tokens when they achieve a Threshold Gitcoin Passport Score and are
            added to the whitelist. <br />
            <b>Testimonial Addition Fee:</b> Users must pay a flat fee of{' '}
            <b>100 POT</b> to add a testimonial, preventing spamming of the
            platform with excessive testimonials. <br />
            <b>Testimonial Reward:</b> The testimonial owner is rewarded with{' '}
            <b>10 POT</b> when their testimonial is upvoted by a whitelisted
            user, and similarly penalized with <b>10 POT</b> when downvoted by a
            whitelisted user. All rewards and penalties are tracked in a reward
            pool, which can be claimed by the user once it reaches a minimum
            value of <b>50 POT</b>
            (set for the MVP demo).
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Currently, Proof of Testimonials allows users to add off-chain
            attestations on Arweave using SignX, as most attestations involve
            large data volumes that are not feasible to store on-chain.
            Additionally, since SignX has not yet launched on Non-Devnet, these
            attestations are selected by the Proof of Testimonials backend (
            which will be a set of validator nodes in the future ), verified,
            and indexed on-chain for reward and punishment mechanics. As the
            validator nodes manage on-chain transactions, Neon EVM is used for
            the MVP demo, which offers fast processing and very low network
            fees.
          </p>
        </div>
        <div className="py-8 px-5 md:px-10 lg:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Future Enhancements
          </h2>
          <p className="text-lg text-gray-600">
            'Proof of Testimony' is designed to evolve with the community's
            needs. Future enhancements may include the verification of products
            added by user. This feature would allow users to verify the
            authenticity of products. Also profile changes tracker can be build
            to monitor closely the changes made to the profile of the user and
            thus avoid spoofing.
          </p>
        </div>
      </div>

      {/* Image container */}
      <div className="lg:w-1/2 flex justify-center items-center py-8 lg:py-0">
        <img
          src={UserJourney}
          alt="User Journey"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  )
}

export default Explanation
