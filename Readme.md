
# Tnb-hd-wallet

Keeping all your crypto in a single wallet has some disadvantages because hackers or private investigators can track transactions back to you, and accounts with large amounts of coins give hackers more incentive to hack it.

Creating multiple accounts as a solution to this problem also poses some risks as managing multiple keys can prove to be a difficult task with the added risk that they could also be misplaced.

This project solves both these problems as all you need to control an infinite number of accounts is just a 12-word mnemonic phrase. With a 12-word mnemonic, you can generate keys not just for thenewboston alone but for other cryptocurrencies as well while increasing your privacy if you use different accounts for different transactions.

This project was sponsored by [thenewboston](https://thenewboston.com), check out the original proposal [here](https://github.com/thenewboston-developers/Projects/issues/198)
  
## Features

- Seed Generation
- Mnemonic sentence generation 
- Normal and Hardened child address generation
- Ed25519 and SECP256K1 Derivations

## Supported Cryptocurrency
[TNB](https://thenewboston.com), [ETH](https://ethereum.org/en/), [BTC](https://bitcoin.org/en/)


## Getting Started

### Documentation

[Documentation](https://github.com/tomijaga/Tnb-HD-Wallet/blob/main/Docs.md)

### Installation 

```bash 
  npm install Tnb-hd-wallet
```

### Running Tests

```bash
  npm run test
```

## Contributing

Contributions are always welcome!

Clone this repository, install dependecies and start contributing
```bash 
  git clone https://github.com/tomijaga/Tnb-HD-Wallet
  cd Tnb-hd-wallet
  npm install
```

  

## Authors

#### Tomi - [@tomijaga](https://github.com/tomijaga)
Donate with TNBC - 8de30226230c35bbc1ce4a63c62a7b9c86bf0ce21fc7bc1a984b7884a9f88782

#### Nikhil - [@itsNikhil](https://github.com/itsNikhil)
Donate with TNBC - e9c5acac0806aca6ba2c0ade74d93ec4f9a89d8743fa477c52ce9b7817dcad95

## Resources
- [Slip 10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md)
- [Bip44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [Bip 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [Bip 39 Mnemonic](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [Ian Coleman's Hd Key derivation Website](https://iancoleman.io/bip39/)
  

## License

MIT
