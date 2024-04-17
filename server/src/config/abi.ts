export const abi = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addTestimonial',
    inputs: [
      {
        name: 'attestationId',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'attestor',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'productId',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'claimReward',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'downvote',
    inputs: [
      {
        name: 'testimonialAttestationId',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'downvoteDelegate',
    inputs: [
      {
        name: 'attestationId',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'attestor',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'testimonialAttestationId',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getDownvotes',
    inputs: [
      {
        name: 'testimonialAttestationId',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRewardPool',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTestimonials',
    inputs: [
      {
        name: 'productId',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'string[]',
        internalType: 'string[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTokenAddress',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getUpvotes',
    inputs: [
      {
        name: 'testimonialAttestationId',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isWhitelisted',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'revokeWhitelist',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'upvote',
    inputs: [
      {
        name: 'testimonialAttestationId',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'upvoteDelegate',
    inputs: [
      {
        name: 'attestationId',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'attestor',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'testimonialAttestationId',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'whitelist',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Downvote',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'testimonialAttestationId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DownvoteDelegate',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'attestationId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'testimonialAttestationId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RevokeWhitelist',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TestimonialAdded',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'attestationId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'productId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Upvote',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'testimonialAttestationId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UpvoteDelegate',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'attestationId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'testimonialAttestationId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Whitelist',
    inputs: [
      {
        name: 'addr',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'POT__AlreadyDownvoted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'POT__AlreadyUpvoted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'POT__InsufficientTokens',
    inputs: [],
  },
  {
    type: 'error',
    name: 'POT__InvalidTestimonialAttestationId',
    inputs: [],
  },
  {
    type: 'error',
    name: 'POT__Unauthorized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'POT__UserAlreadyWhitelisted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'POT__UserNotWhitelisted',
    inputs: [],
  },
]
