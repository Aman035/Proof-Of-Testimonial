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
        </div>
        <div className="py-8 px-5 md:px-10 lg:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Introducing 'Proof of Testimony'
          </h2>
          <p className="text-lg text-gray-600">
            'Proof of Testimony' addresses these concerns by integrating
            blockchain technology. Users can create profiles and provide
            testimonials that are attested on-chain, offering a new level of
            credibility and verifiability. This system ensures that every review
            comes from a verified source, significantly reducing the likelihood
            of deceptive practices.
          </p>
        </div>
        <div className="py-8 px-5 md:px-10 lg:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Combatting Bots and Spam
          </h2>
          <p className="text-lg text-gray-600">
            To further enhance trust, 'Proof of Testimony' incorporates robust
            measures against bot activity and spam. The integration of trusted
            Decentralized Identifiers (DIDs) plays a key role in this. For
            instance, adopting the Gitcoin Passport ensures that only users with
            a certain score threshold can post testimonials. This system draws
            inspiration from Reddit's Karma system, promoting genuine and
            high-quality contributions.
          </p>
        </div>
        <div className="py-8 px-5 md:px-10 lg:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Future Enhancements and Incentivization
          </h2>
          <p className="text-lg text-gray-600">
            Looking ahead, 'Proof of Testimony' plans to incentivize the review
            process, encouraging authentic and engaged user participation.
            Implementing rewards and recognition systems, akin to those seen on
            platforms like Yelp, will further motivate users to contribute
            valuable insights, while maintaining stringent checks against spam
            and inauthentic reviews.
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
