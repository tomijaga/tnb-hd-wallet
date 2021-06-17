import axios from "axios";

import { Address, Account, Path, Hex, MAX_ADDRESS_GAP } from "../models";
import { WebHdWallet } from "./webHd";

export class TnbHdWallet extends WebHdWallet {
  public nodeUrl: string | null;
  pvUrl = ""

  constructor(seed: string, nodeUrl?: string, configOptions: any = { addressGapLimit: 5 }) {
    super(seed, "thenewboston", configOptions);
    if (nodeUrl){
     this.nodeUrl = nodeUrl;

    }else{
      this.nodeUrl = null;

    }
  }

  private getPvUrl = async () => {
    if (!this.nodeUrl) throw new Error("Did you add the nodeUrl parameter when initializing this HdWallet? Try 'HdWallet.thenewboston(mnemonic, nodeUrl)'")
    const data = (await axios.get(`${this.nodeUrl}/config`)).data

    const { protocol, ip_address, port } = data.primary_validator

    if (port) {
      this.pvUrl = [protocol, "://", ip_address, ":", port].join("")

    } else {
      this.pvUrl = [protocol, "://", ip_address].join("")
    }
  }

  private getBalanceLock = async (accountNumber: Hex) => {
    if (!this.pvUrl) {
      await this.getPvUrl()
    }

    let data

    try {
      data = (await axios.get(`${this.pvUrl}/accounts/${accountNumber}/balance_lock`)).data
    } catch{
      this.getPvUrl()

      data = (await axios.get(`${this.pvUrl}/accounts/${accountNumber}/balance_lock`)).data

    }


    return data.balance_lock;
  }

  async  hasAddressBeenUsed(publicKey: Hex) {
    return !!(await this.getBalanceLock(publicKey))
  }

  formatAddress(address: Address) {
    delete address.chainCode
    return {...address, publicKey: address.publicKey.slice(2)}
  }

}