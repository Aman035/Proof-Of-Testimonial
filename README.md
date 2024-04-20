[![GitHub contributors](https://img.shields.io/github/contributors/Aman035/Proof-Of-Testimonial?style=for-the-badge)](https://github.com/Aman035/Proof-Of-Testimonial/contributors)
[![GitHub issues](https://img.shields.io/github/issues/Aman035/Proof-Of-Testimonial?style=for-the-badge)](https://github.com/Aman035/Proof-Of-Testimonial/issues)
[![GitHub forks](https://img.shields.io/github/forks/Aman035/Proof-Of-Testimonial?style=for-the-badge)](https://github.com/Aman035/Proof-Of-Testimonial/network)
[![GitHub stars](https://img.shields.io/github/stars/Aman035/Proof-Of-Testimonial?style=for-the-badge)](https://github.com/Aman035/Proof-Of-Testimonial/stargazers)
[![GitHub license](https://img.shields.io/github/license/Aman035/Proof-Of-Testimonial?style=for-the-badge)](https://github.com/Aman035/Proof-Of-Testimonial/blob/main/LICENSE)

<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="client/public/logo.png" alt="Logo" width="150" height="130">
  <h3 align="center">Proof Of Testimonials</h3>
  <p align="center" >Bringing the power of decentrealized verifiable attestations to your testimonials. Ensuring every review is genuine and credible</p>
  <p align="center">
    <a href="https://proof-of-testimonials.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/Aman035/Proof-Of-Testimonial/issues">Report Bug</a>
    ·
    <a href="https://github.com/Aman035/Proof-Of-Testimonial/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#problem-statement">Problem Statement</a></li>
        <li><a href="#solution">Solution</a></li>
      </ul>
    </li>
    <li><a href="#built-with">Built With</a>
      <ul>
        <li><a href="#client">Client</a></li>
        <li><a href="#contracts">Contracts</a></li>
        <li><a href="#backend">Backend</a></li>
      </ul>
    </li>
    <li><a href="#deployments">Deployments</a></li>
    <li><a href="#installation">Installation</a>
      <ul>
        <li><a href="#client-installation">Client Installation</a></li>
        <li><a href="#contracts-installation">Contracts Installation</a></li>
        <li><a href="#backend-installation">Backend Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Problem Statement

In a world where product and services quality depend heavily on testimonials and reviews, the authenticity of these reviews can often be questionable.
False testimonials can mislead consumers and damage the reputations of good businesses. Fake reviews can also be used to manipulate the market and create unfair competition. Whereas, genuine testimonials can help businesses grow and build trust with their customers.
Curently all the testimonials found for any web2 / web3 product have to be taken at face value. There is no way to verify if the testimonial was added by a real user or a bot and even if it was added by a real user, there is no way to verify if the user really gave the testimonial or if it was added by the product owners itself twising the words of the user. This is where Proof Of Testimonials comes in.

### Solution

Proof of Testimonials allows users to add products they want reviewed. Users can also create their profiles, enhancing their credibility by linking their social media accounts and other platforms.
All products and profiles are attested off-chain using SignX, which can be verified anytime outside the scope of the platform.

Proof of Testimonials also ensures bot resistance and safety against profile spoofing.

- **Bot Resistance**: Every user profile must have a `Threshold` Gitcoin Passport Score to add a testimonial. This ensures that the user is real and not a bot.
  (Note: The `Threshold` Gitcoin Passport Score can be set by the product owner and is currently set to 1 for the MVP demo.)
- **Profile Spoofing Detection**: Each user profile SignX attestation is linked to the previous profile attestation, thus forming a chain of attestations. This helps the platform detect any recent changes or spoofing in profiles.

Proof of Testimonials also ensures that users who add testimonials are rewarded for quality contributions and penalized for fake testimonials. This is managed through the following mechanisms:

- **One-time Reward on Whitelist**: Users are minted 1000 `POT` tokens when they achieve a `Threshold` Gitcoin Passport Score and are added to the whitelist.
- **Testimonial Addition Fee**: Users must pay a flat fee of 100 `POT` to add a testimonial, preventing spamming of the platform with excessive testimonials.
- **Testimonial Reward**: The testimonial owner is rewarded with 10 `POT` when their testimonial is upvoted by a whitelisted user, and similarly penalized with 10 `POT` when downvoted by a whitelisted user. All rewards and penalties are tracked in a reward pool, which can be claimed by the user once it reaches a minimum value of 50 `POT` (set for the MVP demo).

Currently, Proof of Testimonials allows users to add off-chain attestations on **Arweave** using **SignX**, as most attestations involve large data volumes that are not feasible to store on-chain. Additionally, since SignX has not yet launched on Non-Devnet, these attestations are selected by the Proof of Testimonials backend (which will be a set of validator nodes in the future), verified, and indexed on-chain for reward and punishment mechanics. As the validator nodes manage on-chain transactions, **Neon EVM** is used for the MVP demo, which offers fast processing and very low network fees.

## Built With

### Client

- [Vite - React + TS](https://vitejs.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Rainbow Kit](https://www.rainbowkit.com/)
- [SignX SDK](https://docs.sign.global/)
- [Neon EVM](https://neon-devnet.blockscout.com/)

### Contracts

- [Solidity](https://soliditylang.org/)
- [Foundry](https://book.getfoundry.sh/)
- [Solmate](https://github.com/transmissions11/solmate)

### Backend

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [viem](https://viem.sh/)
- [Gitocin Passport](https://docs.passport.gitcoin.co/)
- [SignX Indexing Service](https://docs.sign.global/developer-apis/index-1/usage/indexing-service)

## Deployments

- [DApp](proof-of-testimonials.vercel.app) ( Using Vercel )
- [Contracts](https://neon-devnet.blockscout.com/address/0x3311c551E1F45A2DD7f072ef0a8f2406DE7058bF?tab=contact_code) ( Neon Devnet )
- [Backend](https://proof-of-testimonials.onrender.com) ( Using Render )
- SignX Schemas
  - [Profile](https://testnet-scan.sign.global/schema/SPS_zhkwtSjrbPAoC3eqW0hYV)
  - [Product](https://testnet-scan.sign.global/schema/SPS_Q36c9ZNrfHsgz6B4zu-yA)
  - [Testimonial](https://testnet-scan.sign.global/schema/SPS_5GQyk-P8gyd1gX3_CW3Tk)
  - [Vote](https://testnet-scan.sign.global/schema/SPS_Qpv1GmWVWUZeFY-Ge3A_f)

## Installation

```bash
git clone https://github.com/Aman035/Proof-Of-Testimonial.git
```

### Client

```bash
cd client
npm install
```

```bash
# Start in development mode
npm run dev
```

```bash
# Build for production
npm run build
```

```bash
# Start in production mode
npm run start
```

### Contracts

```bash
cd contracts
forge install
```

```bash
# compile contracts
make compile
```

```bash
# Run tests
make test
```

```bash
# deploy contracts ( Set up .env file according to .env.example beofre deploying )
make deploy
```

### Backend

```bash
cd server
npm install
```

```bash
# Start in development mode
npm run dev
```

```bash
# Start in production mode
npm run start
```

## Contributing

1. Fork the Project
2. Create your Branch (`git checkout -b Amazing`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin Amazing`)
5. Open a Pull Request

</br>
</br>
This project was started by <a href="https://github.com/Aman035">Aman</a> during <a href="https://ethglobal.com/events/scaling2024">EthGlobal's Scaling Ethereum 2024</a>.
