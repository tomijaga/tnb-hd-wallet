import { Address, Account, CoinDetails, Curve, Path, Hex, MAX_ADDRESS_GAP } from "../models";

import { BaseHdWallet } from "./baseHd";
import { WebHdWallet } from "./webHd";

import { BtcHdWallet } from "./bitcoin";
import { EthHdWallet } from "./ethereum";
import { TnbHdWallet } from "./thenewboston";

interface HdWalletCollection{
  [crypto: string]: (mnemonicOrSeed: string, ...otherOptions: any[])=> BaseHdWallet| WebHdWallet
}

export const HdWallet: HdWalletCollection =  {
  /**
   * Default HdWallet for Custom Coin derivations
   */
  default: (mnemonicOrSeed: string, coinDetails: CoinDetails) => new BaseHdWallet(mnemonicOrSeed, coinDetails),

  bitcoin: (mnemonicOrSeed: string) => new BtcHdWallet(mnemonicOrSeed) as WebHdWallet,

  ethereum: (mnemonicOrSeed: string) => new EthHdWallet(mnemonicOrSeed) as WebHdWallet,

  thenewboston: (mnemonicOrSeed: string, nodeUrl?: string) => {
    if (!nodeUrl) return new TnbHdWallet(mnemonicOrSeed, nodeUrl) as BaseHdWallet
    return new TnbHdWallet(mnemonicOrSeed, nodeUrl) as WebHdWallet
  }
}
