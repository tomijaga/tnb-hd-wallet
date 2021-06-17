import {
  Slip10Derivation
} from "../slip0010";

import {
  generateMnemonic,
  mnemonicToSeed,
  mnemonicToSeedSync,
  validateMnemonic
} from "bip39"

import { Address, Account, CoinDetails, Curve, Path, Hex, MAX_ADDRESS_GAP } from "../models";

import { cryptoCurrencies } from "../crypto-currencies"
export class BaseHdWallet  {

  readonly mnemonic: string | null;
  readonly seed: string | Buffer;
  readonly cryptocurrency: string | null;
  readonly purpose: number;
  readonly coinType: number;
  readonly curve: keyof typeof Curve;
  readonly masterKey: Address;

  private slip10: any;

  protected _addressGapLimit: number=20;

  constructor(mnemonicOrSeed: string, coinDetails: CoinDetails | string, configOptions?: any) {

    if (validateMnemonic(mnemonicOrSeed)) {
      this.mnemonic = mnemonicOrSeed
      this.seed = mnemonicToSeedSync(this.mnemonic).toString("hex")
    } else if (mnemonicOrSeed.length >= 32 && mnemonicOrSeed.length <= 128) {
      this.mnemonic = null;
      this.seed = mnemonicOrSeed;
    } else {
      throw new Error(`Invalid seed: Seed Length has to be between 32 (128 bits) and 128 (516 bits) \nSeed: ${mnemonicOrSeed} \nSeedLength: ${mnemonicOrSeed.length}`);
    }

    if (typeof coinDetails === "string") {
      const crypto = coinDetails
      const details = cryptoCurrencies[crypto]

      if (!details) throw new Error(`'${crypto}' is' Not Supported`)

      this.cryptocurrency = crypto

      const { purpose, coinType, curve } = details

      this.purpose = purpose;
      this.coinType = coinType;
      this.curve = curve;
    } else {
      this.cryptocurrency = null
      const { purpose, coinType, curve } = coinDetails

      this.purpose = purpose;
      this.coinType = coinType;
      this.curve = curve;
    }

    this.slip10 = new Slip10Derivation(this.curve, this.seed)
    this.masterKey = this.slip10.masterKey

    this.addressGapLimit = 20
  }

  set addressGapLimit(gapLimit: number) {
    if (gapLimit > 0 && gapLimit <= MAX_ADDRESS_GAP) {
      this._addressGapLimit = gapLimit
    }
  }

  get addressGapLimit() {
    return this._addressGapLimit;
  }

/**
 * Takes in an account and address index and returns its derivatiion path
 * 
 * @param accountIndex The account location for the path
 * 
 * @param addressIndex The last 
 */
  getPath = (accountIndex: number, addressIndex: number = 0, isInternalChain: boolean = false): Path => {
    if (this.curve === "ed25519") {
      return `m/${this.purpose}'/${this.coinType}'/${accountIndex}'/${Number(isInternalChain)}'/${addressIndex}'`
    }
    return `m/${this.purpose}'/${this.coinType}'/${accountIndex}'/${Number(isInternalChain)}/${addressIndex}`
  };

/**
 * Gets an address object from a specified path
 * 
 * @param path The derivation path
 * 
 * @returns an address object containing all the derived keys
 */
  getAddressFromPath(path: Path): Address {
    return this.slip10.derivePath(path);
  }

/**
 * Gets an address object from a specified account and address index
 * 
 * @param accountIndex
 * 
 * @param addressIndex
 * 
 * @returns an address object containing all the derived keys
 */
  getAddress(accountIndex: number, addressIndex: number = 0): Address {
    const path = this.getPath(accountIndex, addressIndex);
    return this.getAddressFromPath(path)
  }




}
