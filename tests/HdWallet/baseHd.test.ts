import {HdWallet} from "../../src/HdWallet"

import {cryptoCurrencies} from "../../src/crypto-currencies"
import {isValidHex} from "../../src/utils"
import {CoinDetails} from "../../src/models"

const mnemonic = "sniff song hill jump actual sustain attend pluck clock myself sponsor monster"

const seed = '2c537dbc2d04ba16aadb41d9e07f73baa894989a7630d54852a79c1016588cbfdc1b4d2d83d65228f93a942877e5f87666540cdea45316d1b7d32e9e81755ce8'

describe("Base / Default HdWallet: ", ()=>{

it("Ed25519 Custom Coin Details", ()=>{
  const coinDetails: CoinDetails = {
    purpose: 44,
    coinType: 123,
    curve: 'ed25519'
  }

  const hd =  HdWallet.default(mnemonic, coinDetails)

  expect(hd.mnemonic).toBe(mnemonic)
  expect(hd.seed).toBe(seed)

  expect(hd.cryptocurrency).toBe(null)
  expect(hd.curve).toBe("ed25519")
  expect(hd.purpose).toBe(44)
  expect(hd.coinType).toBe(123)
  expect(hd.addressGapLimit).toBe(20)

  expect(new RegExp("^m(\\/[0-9]+')+$").test(hd.getPath(0))).toBeTruthy()
  expect(hd.getPath(0,0)).toBe("m/44'/123'/0'/0'/0'")
  expect(hd.getPath(1,2)).toBe("m/44'/123'/1'/0'/2'")
  expect(hd.getPath(2,3)).toBe("m/44'/123'/2'/0'/3'")

})

it("Secp256k1 Custom Coin Details", ()=>{
  const coinDetails:CoinDetails = {
    purpose: 44,
    coinType: 123,
    curve: 'secp256k1'
  }

  const hd =  HdWallet.default(mnemonic, coinDetails)

  expect(hd.mnemonic).toBe(mnemonic)
  expect(hd.seed).toBe(seed)

  expect(hd.cryptocurrency).toBe(null)
  expect(hd.curve).toBe("secp256k1")
  expect(hd.purpose).toBe(44)
  expect(hd.coinType).toBe(123)
  expect(hd.addressGapLimit).toBe(20)

  expect(hd.getPath(0,0)).toBe("m/44'/123'/0'/0/0")
  expect(hd.getPath(1,2)).toBe("m/44'/123'/1'/0/2")
  expect(hd.getPath(2,3)).toBe("m/44'/123'/2'/0/3")

})

it("getAddressFromPath(path: string)", ()=>{
  const coinDetails:CoinDetails = {
    purpose: 44,
    coinType: 123,
    curve: 'ed25519'
  }

  const hd =  HdWallet.default(mnemonic, coinDetails)

 const address0 = hd.getAddressFromPath("m/44'/123'/0'/0'/0'")
  expect(address0.path).toBe("m/44'/123'/0'/0'/0'")
  expect(isValidHex(address0.publicKey)).toBeTruthy()
  if(address0.chainCode)
  expect(isValidHex(address0.chainCode)).toBeTruthy()
  expect(isValidHex(address0.privateKey)).toBeTruthy()


  // expect(hd.getAddressFromPath("m/44'/123'/0'/0/0")).toThrow()

})

it("getAddress(accountIndex: number, addressIndex: number)", ()=>{
   const coinDetails:CoinDetails = {
    purpose: 44,
    coinType: 123,
    curve: 'secp256k1'
  }

  const hd =  HdWallet.default(mnemonic, coinDetails)

  const address0 = hd.getAddress(0,0)
  expect(address0.path).toBe("m/44'/123'/0'/0/0")
  expect(isValidHex(address0.publicKey)).toBeTruthy()
   if(address0.chainCode)
  expect(isValidHex(address0.chainCode)).toBeTruthy()
  expect(isValidHex(address0.privateKey)).toBeTruthy()

  const address1 = hd.getAddress(1,2) 
  expect(address1.path).toBe("m/44'/123'/1'/0/2")
  expect(isValidHex(address1.publicKey)).toBeTruthy()
   if(address1.chainCode)
  expect(isValidHex(address1.chainCode)).toBeTruthy()
  expect(isValidHex(address1.privateKey)).toBeTruthy()
})

})
