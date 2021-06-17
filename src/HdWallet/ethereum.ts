import axios from "axios"

import {WebHdWallet} from "./webHd";
import {Address, Account , Path, Hex, MAX_ADDRESS_GAP} from "../models";
import publicKeyToAddress from "ethereum-public-key-to-address"

export class EthHdWallet extends WebHdWallet{

  constructor(seed: string, configOptions:any={addressGapLimit:5}) {
    super(seed, "ethereum", configOptions);

  }

 async hasAddressBeenUsed(publicKey: Hex){
   const data = ( await axios.get(`https://api.blockchair.com/ethereum/dashboards/address/${publicKey}?limit=0`)).data.data

const transactionCount = data[publicKey.toLowerCase()].address.transaction_count

return !!transactionCount
  }

  formatAddress(address: Address){
    delete address.chainCode
    
    const pubKeyAddress = publicKeyToAddress(address.publicKey)
    const privKey = "0x".concat(address.privateKey)

    return {...address, publicKey: pubKeyAddress,  privateKey: privKey }
 
  }

}