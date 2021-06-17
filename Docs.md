
## Derivation paths for supported coins
For compatibility reasons all addresses are derived using the [bip44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#path-levels) format
`m / purpose' / coin_type' / account' / change / address_index`

> Note: This project does not support change address. It uses only external addresses `m/44'/123'/a/[0]/i`


`a` - account index

`i` - address index

| coin     | curve     | path               |
| -------- | --------- | ------------------ |
| Bitcoin  | secp256k1 | `m/44'/0'/a'/0/i`    | 
| Ethereum | secp256k1 | `m/44'/60'/a'/0/i`    | 
| Thenewboston | ed25519 | `m/44'/2002'/a'/0/i`  |    

> The account and address index change depending on the path of the derived address


## Code Documentation
### Mnemonic Phrase generation 
- Generates a 12 word mnemonic phrase to be used for wallet derivations

```ts
  
  import {generateMnemonic} from "Tnb-Hd-wallet"

  const mnemonic = generateMnemonic()

  console.log(mnemonic)
  // "sniff song hill jump actual sustain attend pluck clock myself sponsor monster"

```

### Creating a new wallet for a specific coin
```ts

  import {generateMnemonic, HdWallet} from "Tnb-Hd-wallet"

  const mnemonic = generateMnemonic()

  const btc = HdWallet.bitcoin(mnemonic)
  const eth = HdWallet.ethereum(mnemonic)

  const tnb = HdWallet.thenewboston(mnemonic)

```
  **thenewboston** network is still in alpha, and there is no stable API where we consistently retrieve blockchain stats, so you have to specify a bank's URL if you want to use the [getAccount](#async-getaccountaccountindex-number-account) and [getAccounts](#async-getaccounts-account) methods


```ts


 const bankUrl = "http://54.177.121.3"

 const tnb = HdWallet.thenewboston(mnemonic, bankUrl)

```

## HdWallet

```ts
  import { HdWallet} from "Tnb-Hd-wallet" 

  const mnemonic = "sniff song hill jump actual sustain attend pluck clock myself sponsor monster"
  const tnb = HdWallet.thenewboston(mnemonic, "http://54.177.121.3")
```
### mnemonic
- hd wallet mnemonic
```ts
  tnb.mnemonic
  // "sniff song hill jump actual sustain attend pluck clock myself sponsor monster"
```
### seed
- 256 bit (32 hex length) seed derived from mnemonic
```ts
  tnb.seed
  // "2c537dbc2d04ba16aadb41d9e07f73baa894989a7630d54852a79c1016588cbfdc1b4d2d83d65228f93a942877e5f87666540cdea45316d1b7d32e9e81755ce8"
```
### curve
- Derivation curve for the specific coin
```ts
  tnb.curve // "ed25519"
```
### purpose
- 1st level in bip 44 path
```ts
  tnb.purpose // 44
```
### coinType
- 2nd level in bip 44 path
```ts
  tnb.coinType // 2002
```

### masterKey
  - Getter for the hd wallet master public key, private key and chain code

```ts
  tnb.masterKey

  /*
    {
      path: 'm',
      publicKey: '008fe9693f8fa62a4305a140b9764c5ee01e455963744fe18204b4fb948249308a',
      chainCode: 'ef70a74db9c3a5af931b5fe73ed8e1a53464133654fd55e7a66f8570b8e33c3b',
      privateKey: '171cb88b1b3c1db25add599712e36245d75bc65a1a5c9e18d76f9f2b1eab4012'
    }
  */
```

### getPath(accountIndex: number, addressIndex: number): string
- Returns a path specified by the account and address index in the bip44 format
```ts

  tnb.getPath(0, 0)
  
  // m/44'/2002'/0'/0'/0'

  tnb.getPath(1, 2)
  
  // m/44'/2002'/1'/0'/2'

```
### getAddressFromPath(path: string): [Address](#address)
- Derives and returns an address specified by the path

> Note: path that do not use the bip44 format will not be picked up by crypto wallets 

```ts

  tnb.getAddressFromPath("m/44'/2002'/0'/0'/0'")

  /*
    {
      path: "m/44'/2002'/0'/0'/0'",
      publicKey: '72fe3f3cc0b70a7f75d21e14b092ea805fc109eb7137e431fe8a94b2df3dc4a6',
      privateKey:   'cc56c297a9cdcc7b6b326a44bcce590f9987fc88b5d683d80560ef4fd8beb337'
    }
  */

  tnb.getAddressFromPath("m/44'/2002'/1'/0'2'")

  /*
    {
      path: "m/44'/2002'/1'/0'/2'",
      publicKey: 'c38cf23b37a5dd6ee433969a135dee2e1cf8ec26e0cd9044e00709d299d0d474',
      privateKey: '1a967baf46b3ab893e3bbd16b2425ae02712a89f9bb00215c838152a377fca2b'
    }
  */

  tnb.getAddressFromPath(1, 2)
  
  // m/44'/2002'/1'/0'/2'
```

### getAddress(accountIndex: number, addressIndex?: number): [Address](#address)
- Derives and returns an address specified by the account and address index

```ts
  tnb.getAddress(0, 0)

  /*
    {
      path: "m/44'/2002'/0'/0'/0'",
      publicKey: '72fe3f3cc0b70a7f75d21e14b092ea805fc109eb7137e431fe8a94b2df3dc4a6',
      privateKey: 'cc56c297a9cdcc7b6b326a44bcce590f9987fc88b5d683d80560ef4fd8beb337'
    }
  */

  // the address index defaults to zero if not specified
  tnb.getAddress(1)
  
  /*
    {
      path: "m/44'/2002'/1'/0'/0'",
      publicKey: '07fa00310379afc5751a251203d3b5f8f666c17c15063d0568c3ca32fbf50ec8',
      privateKey: '27103b1fbbb27893f41d5f03adbd7c03933cadb2c8b3f42da1d0939a90f7f830'
    }
  */

  tnb.getAddress(1, 2)
  /*
    {
      path: "m/44'/2002'/1'/0'/2'",
      publicKey: 'c38cf23b37a5dd6ee433969a135dee2e1cf8ec26e0cd9044e00709d299d0d474',
      privateKey: '1a967baf46b3ab893e3bbd16b2425ae02712a89f9bb00215c838152a377fca2b'
    }
  */

```

### addressGapLimit


- Getter/setter for the addressGapLimit

- The addressGapLimit is the amount of unused addresses hit in a row when before the program stops searching for new addreses

- the addressGapLimit is 20 by default

- it can be changed to a value between 1 and 20

- the addressGapLimit determines the number of **freshAddresses** displayed with the [getAccount](#async-getaccountaccountindex-number-account) and [getAccounts](#async-getaccounts-account) methods


```ts

tnb.addressGapLimit // 20

```

### (async) getAccount(accountIndex: number): [Account](#account)
- Returns an account specified by the account index
```ts

/*
  For the purpose of this project an account is a collection of all used addresses with the same account accountIndex

  For example address with paths: 
    -  "m/44'/2002'/1'/0'/0'"
    -  "m/44'/2002'/1'/0'/1'"
    -  "m/44'/2002'/1'/0'/2'"

    all belong to the account with an index of 1
  
*/
  import {generateMnemonic, HdWallet} from "Tnb-Hd-wallet" 

  const tnb = HdWallet.thenewboston(generateMnemonic(), "http://54.177.121.3")

  tnb.addressGapLimit = 5

  tnb.getAccount(0).then(console.log)

  /*
    {
      usedAddresses: [
        {
          path: "m/44'/2002'/0'/0'/0'",
          publicKey:    '72fe3f3cc0b70a7f75d21e14b092ea805fc109eb7137e431fe8a94b2df3dc4a6',
          privateKey:     'cc56c297a9cdcc7b6b326a44bcce590f9987fc88b5d683d80560ef4fd8beb337'
        }
      ],
      freshAddresses: [
        {
          path: "m/44'/2002'/0'/0'/1'",
          publicKey:    'a6618629b5e1ddebc7a589b7bf6e97dc2b2b548428179a2a9da56dfdb3548d49',
          privateKey:     'ddc5c329778861144d429e28838c729ee69b4ae4967c2a2c9b2fce12ef2b05db'
        },
        {
          path: "m/44'/2002'/0'/0'/2'",
          publicKey:    'c581bd16e92477ae4b721fa0b554a3561d35444728403b1a195344c821d336b5',
          privateKey:     'e1e8d3640ec325d851fd63816c5ef9ee29470227e9b391de4ce6f97adb9b53bf'
        },
        {
          path: "m/44'/2002'/0'/0'/3'",
          publicKey:    'fb346e0c262db121ebdcc36e022d843231f166a450464367b116c6237e32f85e',
          privateKey:     '00b911eee03957bc9f63659a30d02898969a0294b02a07ad93fcd4f9a4af835b'
        },
        {
          path: "m/44'/2002'/0'/0'/4'",
          publicKey:    '2b2cd5d8972fbdfe2cc3633afd4917302e8081edb5ce40ece8b4d7ea0d810414',
          privateKey:     '7a7738ab78b5641d9d9c6b142c62ab25ad9ce92fbaf8e857b7fc446b250c08a3'
        },
        {
          path: "m/44'/2002'/0'/0'/5'",
          publicKey:    '612807b6d4918c738942f14089ff3c949dd831c0f0195dccb5da0a4492f1f6c8',
          privateKey:     'd999dcac90b1dcbda5bb7a5faf70351c1cdfcf108f69e352619da43e001ae841'
        }
      ]
    }
  */
```

### (async) getAccounts(): [Account](#account)[]
- Retrieves all existing accounts 

```ts
  import {generateMnemonic, HdWallet} from "Tnb-Hd-wallet" 

  const tnb = HdWallet.thenewboston(generateMnemonic(), "http://54.177.121.3")

  tnb.addressGapLimit = 5

  tnb.getAccounts().then(console.log)

  /*
  [
    {
      usedAddresses: [
        {
          path: "m/44'/2002'/0'/0'/0'",
          publicKey:    '72fe3f3cc0b70a7f75d21e14b092ea805fc109eb7137e431fe8a94b2df3dc4a6',
          privateKey:     'cc56c297a9cdcc7b6b326a44bcce590f9987fc88b5d683d80560ef4fd8beb337'
        }
      ],
      freshAddresses: [
        {
          path: "m/44'/2002'/0'/0'/1'",
          publicKey:    'a6618629b5e1ddebc7a589b7bf6e97dc2b2b548428179a2a9da56dfdb3548d49',
          privateKey:     'ddc5c329778861144d429e28838c729ee69b4ae4967c2a2c9b2fce12ef2b05db'
        },
        {
          path: "m/44'/2002'/0'/0'/2'",
          publicKey:    'c581bd16e92477ae4b721fa0b554a3561d35444728403b1a195344c821d336b5',
          privateKey:     'e1e8d3640ec325d851fd63816c5ef9ee29470227e9b391de4ce6f97adb9b53bf'
        },
        {
          path: "m/44'/2002'/0'/0'/3'",
          publicKey:    'fb346e0c262db121ebdcc36e022d843231f166a450464367b116c6237e32f85e',
          privateKey:     '00b911eee03957bc9f63659a30d02898969a0294b02a07ad93fcd4f9a4af835b'
        },
        {
          path: "m/44'/2002'/0'/0'/4'",
          publicKey:    '2b2cd5d8972fbdfe2cc3633afd4917302e8081edb5ce40ece8b4d7ea0d810414',
          privateKey:     '7a7738ab78b5641d9d9c6b142c62ab25ad9ce92fbaf8e857b7fc446b250c08a3'
        },
        {
          path: "m/44'/2002'/0'/0'/5'",
          publicKey:    '612807b6d4918c738942f14089ff3c949dd831c0f0195dccb5da0a4492f1f6c8',
          privateKey:     'd999dcac90b1dcbda5bb7a5faf70351c1cdfcf108f69e352619da43e001ae841'
        }
      ]
    },
    ... all other existing accounts
  ]
  */
```

## Types

### Address
```ts
  {
    path: Path,
    chainCode?: Hex,
    publicKey: Hex,
    privateKey: Hex,
  }

```

### Account
```ts
  {
    usedAddresses: Address[],
    freshAddresses: Address[]
  }
```