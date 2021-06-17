import {
  generateMnemonic,
  mnemonicToSeed,
  mnemonicToSeedSync,
  validateMnemonic
} from "bip39"


import { Address, Account, CoinDetails, Curve, Path, Hex, MAX_ADDRESS_GAP } from "../models";

import { cryptoCurrencies } from "../crypto-currencies"

import { BaseHdWallet } from "./baseHd"

export abstract class WebHdWallet extends BaseHdWallet {

  //Api call to check if address has any transactions
  abstract hasAddressBeenUsed(publicKey: Hex): Promise<boolean>;

  //All Child classes are required to format Addresses in their specific crypto-currency format
  protected abstract formatAddress(address: Address): Address;

  getAddressFromPath(path: Path){
    return this.formatAddress(super.getAddressFromPath(path))
  }

  protected hasAccountBeenCreated = async (accountIndex: number) => {
    let addressIndex = 0;
    let addressGap = 0;
    while (addressGap < this._addressGapLimit) {
      const addressPath = this.getPath(accountIndex, addressIndex);
      const address = this.getAddressFromPath(addressPath);
      // console.log({address})
      const isAddressUsed = await this.hasAddressBeenUsed(address.publicKey);
      if (isAddressUsed) return true;

      addressGap += 1
      addressIndex += 1;
    }
    return false;
  }

  protected scanAccountForAddresses = async (accountIndex: number) => {
    const usedAddresses: Address[] = []
    const freshAddresses: Address[] = []

    let addressIndex = 0;
    let addressGap = 0;

    while (addressGap < this._addressGapLimit) {
      const addressPath = this.getPath(accountIndex, addressIndex);
      const address = this.getAddressFromPath(addressPath);
      // console.log(address);

      const isAddressUsed = await this.hasAddressBeenUsed(address.publicKey);
      if (isAddressUsed) {
        usedAddresses.push(address);
        addressGap = 0;
      } else {
        addressGap += 1;
        freshAddresses.push(address)
      }
      addressIndex += 1;

    }

    return { usedAddresses, freshAddresses }
  }

  getAccount = async (accountIndex: number): Promise<Account> => {
    if (accountIndex < 0)
      throw new Error("accountIndex has to be greater than or equal to 0")


    if (accountIndex > 0) {
      const isAccountCreated = (await this.hasAccountBeenCreated(accountIndex - 1))

      if (!isAccountCreated) {
        return { usedAddresses: [], freshAddresses: [] };
      }
    }

    let { usedAddresses, freshAddresses } = await this.scanAccountForAddresses(accountIndex);


    const currAccount = { usedAddresses, freshAddresses }

    return currAccount;
  }

  async getAccounts(start: number = 0): Promise<Account[]> {
    const existingAccounts = [];
    let accountIndex = start;
    while (true) {

      const account = await this.scanAccountForAddresses(accountIndex)

      if (account.usedAddresses.length) {
        existingAccounts.push(account);
      } else {
        break;
      }

      accountIndex += 1;
    }

    return existingAccounts;
  }

  createAccount = async (): Promise<Account> => {
    let accountIndex = 0;
    while (true) {
      const isAccountCreated = (await this.hasAccountBeenCreated(accountIndex))

      // console.log({ isAccountCreated })
      if (!isAccountCreated) {
        // console.log(!isAccountCreated)

        const newAccount = await this.getAccount(accountIndex)
        return newAccount;

      }

      accountIndex += 1;
    }

  }
}
