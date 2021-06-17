import { Address, Account,CoinDetails, Curve, Path, Hex, MAX_ADDRESS_GAP } from "../models";

import {BaseHdWallet} from "./baseHd";
import {BtcHdWallet} from "./bitcoin";
import {EthHdWallet} from "./ethereum";
import {TnbHdWallet} from "./thenewboston";

export default {
  /**
   * Default HdWallet for Custom Coin derivations
   */
  default: (mnemonicOrSeed: string, coinDetails: CoinDetails) => new BaseHdWallet(mnemonicOrSeed, coinDetails) ,

  bitcoin: (mnemonicOrSeed: string)=> new BtcHdWallet(mnemonicOrSeed),

  ethereum: (mnemonicOrSeed: string)=> new EthHdWallet(mnemonicOrSeed),

  thenewboston: (mnemonicOrSeed: string , nodeUrl?: string) =>{
    if (!nodeUrl) return new TnbHdWallet(mnemonicOrSeed, nodeUrl) as BaseHdWallet
    return new TnbHdWallet(mnemonicOrSeed, nodeUrl)
  } 
}
