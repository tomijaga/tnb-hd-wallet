import {HdWallet} from "../../src"
import {Address} from "../../src/models"


// Tests Keys derived from https://iancoleman.io/bip39/
const tests: Address[]=[
  {
    path:"m/44'/0'/0'/0/0",
    publicKey:"1NaKFy7AkmQjHAdT7AvgWavMmQuMQ8x6SS",
    privateKey:"L15fShHn5HhxccXbZQiaZQjS6KdDVPVuWz5xsZAeEmWC6XouTsa1"
  },
   {
    path:"m/44'/0'/0'/0/1",
    publicKey:"17MNTxKEfNFkGco72A1TAgRfuSvSgxFeFZ",
    privateKey:"L2YKCM54RV3GZVJvnriGGDzYHXuQCxHbaARzAJE87ikQrvej7ppA"
  },
  {
    path:"m/44'/0'/0'/0/2",
    publicKey:"1EJ4E99zEzUq3ygsgLRRJaBQX3My31QYfa",
    privateKey:"KwnavZzi6qVE67pgQwB2UpVMVhurWVXdb63kv5SSKnRkHeJAAeX4"
  },
   {
    path:"m/44'/0'/0'/0/3",
    publicKey:"16RPnkNqCtQhkZS4MuZhKTRXZNKUJHHR2F",
    privateKey:"L1iwiTzovP3RdBc5K7imoMdvSiqXhUM81tyNKjYJ4jh7QmmezEKM"
  },
  {
    path:"m/44'/0'/0'/0/4",
    publicKey:"19GyqTJ7286huxWTY69wX1xPRDWRCV4qNe",
    privateKey:"KxEdsozb156QWKiuV6jVRiepX61Lh5bEJCJAuue9meLvtsNxYNDT"
  }
]

const mnemonic = "sniff song hill jump actual sustain attend pluck clock myself sponsor monster"

const seed = '2c537dbc2d04ba16aadb41d9e07f73baa894989a7630d54852a79c1016588cbfdc1b4d2d83d65228f93a942877e5f87666540cdea45316d1b7d32e9e81755ce8'

const hd = HdWallet.bitcoin(mnemonic);

describe("Bitcoin HdWalet: ",()=>{
  it("Correct Bitcoin Config", ()=>{
    expect(hd.mnemonic).toBe(mnemonic)
    expect(hd.seed).toBe(seed)

    expect(hd.cryptocurrency).toBe("bitcoin")
    expect(hd.curve).toBe("secp256k1")
    expect(hd.purpose).toBe(44)
    expect(hd.coinType).toBe(0)
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