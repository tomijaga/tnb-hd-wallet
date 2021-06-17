import {HdWallet} from "../../src"
import {Address} from "../../src/models"


// Tests Vectors derived from https://iancoleman.io/bip39/
const tests: Address[]=[
  {
    path:"m/44'/60'/0'/0/0",
    publicKey:"0x43093C36269d519F08A3f2D6201222b5E84769F2",
    privateKey:"0x625fcbe3f8507f0c962c6d13c19de2f49ac7286afa0f7c2469101dbf435a50f3"
  },
   {
    path:"m/44'/60'/0'/0/1",
    publicKey:"0xeEE0B38fc3662FC4144E6Fa98155a8C4217Ae6ee",
    privateKey:"0xd33b4fea204720d6953b3cc7b4b3436aba58f0d0eb4277f1a60a3cd8cf14a57c"
  },
  {
    path:"m/44'/60'/0'/0/2",
    publicKey:"0x84d9a721413dECb2fd1ED1464C83799d828b27Ca",
    privateKey:"0xf3003f4679f3e5304abdb632b9266b14f69aef978def6187caeaf61de45673c3"
  },
   {
    path:"m/44'/60'/0'/0/3",
    publicKey:"0xb9362fc3200F07a18619479793702D6B9115Af7E",
    privateKey:"0xc115f4ec35598e9a78152e88c62d63ea4dc6aea7329f354af5c26a45ecabdccc"
  },
  {
    path:"m/44'/60'/0'/0/4",
    publicKey:"0x3337CB09A2BC2473C861628bBD431ed7E318c244",
    privateKey:"0x133d5ae6443d97b4d6387fbf7a57bde06b551e6b413d7b14deb2ce4d8ae22a70"
  }
]

const mnemonic = "sniff song hill jump actual sustain attend pluck clock myself sponsor monster"

const seed = '2c537dbc2d04ba16aadb41d9e07f73baa894989a7630d54852a79c1016588cbfdc1b4d2d83d65228f93a942877e5f87666540cdea45316d1b7d32e9e81755ce8'

const hd = HdWallet.ethereum(mnemonic);

describe("Ethereum HdWallet: ",()=>{
  it("Correct Ethereum Config", ()=>{
    expect(hd.mnemonic).toBe(mnemonic)
    expect(hd.seed).toBe(seed)

    expect(hd.cryptocurrency).toBe("ethereum")
    expect(hd.curve).toBe("secp256k1")
    expect(hd.purpose).toBe(44)
    expect(hd.coinType).toBe(60)
    expect(hd.addressGapLimit).toBe(20)

  })

  it("Test Vectors",()=>{
    tests.map((testAddress: Address, i: number)=>{
      const derivedAddress = hd.getAddress(0, i)
      expect(derivedAddress.path).toBe(testAddress.path)
      expect(derivedAddress.publicKey).toBe(testAddress.publicKey)
      expect(derivedAddress.privateKey).toBe(testAddress.privateKey)
    })
  })
})