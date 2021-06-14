export const SimpleStorageAddress = '0x976A02f5015272993b3c27278986E565C68B7142'

export const SimpleStorageAbi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'data_',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_data',
        type: 'string',
      },
    ],
    name: 'DataSet',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getData',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'data_',
        type: 'string',
      },
    ],
    name: 'setData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
