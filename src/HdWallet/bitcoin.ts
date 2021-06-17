import axios from "axios";

import { Address, Account, Path, Hex, MAX_ADDRESS_GAP } from "../models";
import { WebHdWallet } from "./webHd";
import { 
  BIP32Interface,
  fromPrivateKey as bip32FromPrivateKey
  } from "bip32"

import bs58check from "bs58check-ts"

export class BtcHdWallet extends WebHdWallet {

  constructor(seed: string, configOptions: any = { addressGapLimit: 20 }) {
    super(seed, "bitcoin", configOptions);
  }


  async  hasAddressBeenUsed(publicKey: Hex) {
    const data =( await axios.get(`https://api.blockchair.com/bitcoin/dashboards/address/${publicKey}?limit=1`)).data.data

const transactionCount = data[publicKey].address.transaction_count

return !!transactionCount
  }

  formatAddress(address: Address) {
   if (address.chainCode){
const privateKey = Buffer.from(address.privateKey,"hex")
    
    const chainCode = Buffer.from(address.chainCode,"hex")
  const bip32 = bip32FromPrivateKey(privateKey,chainCode)
    delete address.chainCode

    const identifier = bip32.identifier

    const pubKey = bs58check.encode(Buffer.concat([Buffer.alloc(1), identifier]))

    return {...address, publicKey: pubKey, privateKey: bip32.toWIF()}
    }
    return address
    
  }

}