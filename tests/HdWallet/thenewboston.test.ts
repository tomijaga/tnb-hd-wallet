import {HdWallet} from "../../src/HdWallet"
import {cryptoCurrencies} from "../../src/crypto-currencies"
import {isValidHex} from "../../src/utils"

import {Address} from "../../src/models"


const mnemonic = "sniff song hill jump actual sustain attend pluck clock myself sponsor monster"

const seed = '2c537dbc2d04ba16aadb41d9e07f73baa894989a7630d54852a79c1016588cbfdc1b4d2d83d65228f93a942877e5f87666540cdea45316d1b7d32e9e81755ce8'


describe("Thenewboston HdWallet: ", ()=>{

  it("Mnemonic derivation", ()=>{
    const hd =  HdWallet.thenewboston(mnemonic, "http://54.177.121.3")

    expect(hd.mnemonic).toBe(mnemonic)
    expect(hd.seed).toBe(seed)
  })

  it("Seed derivation", ()=>{
  const hd =  HdWallet.thenewboston(seed, "http://54.177.121.3")

  expect(hd.mnemonic).toBe(null)
  expect(hd.seed).toBe(seed)
})

it("Coin Details", ()=>{
  const hd =  HdWallet.thenewboston(mnemonic, "http://54.177.121.3")

  expect(hd.mnemonic).toBe(mnemonic)
  expect(hd.seed).toBe(seed)

  expect(hd.cryptocurrency).toBe("thenewboston")
  expect(hd.curve).toBe("ed25519")
  expect(hd.purpose).toBe(44)
  expect(hd.coinType).toBe(2002)
  expect(hd.addressGapLimit).toBe(20)

})

  it("getAddress", ()=>{
  const hd =  HdWallet.thenewboston(mnemonic, "http://54.177.121.3")

  expect(hd.mnemonic).toBe(mnemonic, )
  expect(hd.seed).toBe(seed)

  const test1 = hd.getAddress(1,2)

  expect(test1.path).toBe("m/44'/2002'/1'/0'/2'")
  expect(isValidHex(test1.publicKey)).toBeTruthy()
  expect(test1.publicKey.length).toBe(64)

  expect(isValidHex(test1.privateKey)).toBeTruthy()
  expect(test1.privateKey.length).toBe(64)


  const test2 = hd.getAddress(23,46)

  expect(test2.path).toBe("m/44'/2002'/23'/0'/46'")
  expect(isValidHex(test2.publicKey)).toBeTruthy()
  expect(test2.publicKey.length).toBe(64)

  expect(isValidHex(test2.privateKey)).toBeTruthy()
  expect(test2.privateKey.length).toBe(64)
})

})



