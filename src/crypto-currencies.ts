import {CoinDetails} from "./models"

export const cryptoCurrencies:{
  [crypto: string]: CoinDetails
}   = {
  bitcoin: {
    purpose: 44,
    coinType: 0,
    curve:"secp256k1",
  },
  binance:{
    purpose: 44,
    coinType: 714,
    curve:"secp256k1"
  },
  
  ethereum:{
    purpose:44,
    coinType: 60,
    curve:"secp256k1"
  },
  thenewboston:{
    purpose: 44,
    coinType: 2002,
    curve: "ed25519"
  }
}