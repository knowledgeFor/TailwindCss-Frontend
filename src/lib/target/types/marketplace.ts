/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/marketplace.json`.
 */
export type Marketplace = {
  address: 'coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF'
  metadata: {
    name: 'marketplace'
    version: '0.1.0'
    spec: '0.1.0'
    description: 'Created with Anchor'
  }
  instructions: [
    {
      name: 'buyListing'
      discriminator: [115, 149, 42, 108, 44, 49, 140, 153]
      accounts: [
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'listing'
          writable: true
        },
        {
          name: 'order'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [111, 114, 100, 101, 114]
              },
              {
                kind: 'account'
                path: 'payer'
              },
              {
                kind: 'account'
                path: 'listing'
              }
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'createListing'
      discriminator: [18, 168, 45, 24, 191, 31, 117, 54]
      accounts: [
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'marketplace'
          writable: true
        },
        {
          name: 'listing'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [108, 105, 115, 116, 105, 110, 103]
              },
              {
                kind: 'account'
                path: 'marketplace'
              },
              {
                kind: 'arg'
                path: 'id'
              }
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'id'
          type: 'u64'
        },
        {
          name: 'price'
          type: 'u64'
        }
      ]
    },
    {
      name: 'initializeMarketplace'
      discriminator: [47, 81, 64, 0, 96, 56, 105, 7]
      accounts: [
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'marketplace'
          writable: true
          signer: true
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: []
    }
  ]
  accounts: [
    {
      name: 'listing'
      discriminator: [218, 32, 50, 73, 43, 134, 26, 58]
    },
    {
      name: 'marketplace'
      discriminator: [70, 222, 41, 62, 78, 3, 32, 174]
    },
    {
      name: 'order'
      discriminator: [134, 173, 223, 185, 77, 86, 28, 51]
    }
  ]
  errors: [
    {
      code: 6000
      name: 'listingAlreadyExists'
      msg: 'A listing with this ID already exists'
    }
  ]
  types: [
    {
      name: 'listing'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'id'
            type: 'u64'
          },
          {
            name: 'price'
            type: 'u64'
          },
          {
            name: 'seller'
            type: 'pubkey'
          },
          {
            name: 'buyer'
            type: 'pubkey'
          },
          {
            name: 'soldAmount'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'marketplace'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'listingCount'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'order'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'id'
            type: 'u64'
          },
          {
            name: 'buyer'
            type: 'pubkey'
          },
          {
            name: 'listing'
            type: 'pubkey'
          }
        ]
      }
    }
  ]
}
