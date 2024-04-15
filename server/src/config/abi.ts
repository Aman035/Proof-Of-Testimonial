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
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeWhitelist',
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
    name: 'AddressWhitelisted',
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
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'POT__Unauthorized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'POT__UserNotWhitelisted',
    inputs: [],
  },
]
