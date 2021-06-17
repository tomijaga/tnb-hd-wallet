import {
  Slip10Derivation
} from "../../src/slip0010"

/*
   Test vectors from the Satoshi Labs Improvement Proposal (SLIP)
   https://github.com/satoshilabs/slips/blob/master/slip-0010.md#test-vectors
*/
import testVectors from "./testVectors.json"


const keyDerivationTest = (testNum: number, curve: "ed25519" | "secp256k1", testVectorIndex: number) => {
  const seed = testVectors[testNum].seed
  const vectors = testVectors[testNum][curve]
  const vector = vectors[testVectorIndex]
  const path = vector.path

  const slip10 = new Slip10Derivation(curve, seed)
  const address = slip10.derivePath(path)

  expect(address.privateKey).toBe(vector.privateKey)
  expect(address.chainCode).toBe(vector.chainCode)
  expect(address.publicKey).toBe(vector.publicKey)
  expect(address.path).toBe(path)

}

describe("First ed25519 Key Derivation Test", () => {

  it("Test Vector 0", () => {
    keyDerivationTest(0, "ed25519", 0)
  })

  it("Test Vector 1", () => {
    keyDerivationTest(0, "ed25519", 1)
  })

  it("Test Vector 2", () => {
    keyDerivationTest(0, "ed25519", 2)
  })

  it("Test Vector 3", () => {
    keyDerivationTest(0, "ed25519", 3)
  })

  it("Test Vector 4", () => {
    keyDerivationTest(0, "ed25519", 4)
  })

  it("Test Vector 5", () => {
    keyDerivationTest(0, "ed25519", 5)
  })
})

describe("Second ed25519 Key Derivation Test", () => {

  it("Test Vector 0", () => {
    keyDerivationTest(1, "ed25519", 0)
  })

  it("Test Vector 1", () => {
    keyDerivationTest(1, "ed25519", 1)
  })

  it("Test Vector 2", () => {
    keyDerivationTest(1, "ed25519", 2)
  })

  it("Test Vector 3", () => {
    keyDerivationTest(1, "ed25519", 3)
  })

  it("Test Vector 4", () => {
    keyDerivationTest(1, "ed25519", 4)
  })

  it("Test Vector 5", () => {
    keyDerivationTest(1, "ed25519", 5)
  })
})



describe("First secp256k1 Key Derivation Test", () => {

  it("Test Vector 0", () => {
    keyDerivationTest(0, "secp256k1", 0)
  })

  it("Test Vector 1", () => {
    keyDerivationTest(0, "secp256k1", 1)
  })

  it("Test Vector 2", () => {
    keyDerivationTest(0, "secp256k1", 2)
  })

  it("Test Vector 3", () => {
    keyDerivationTest(0, "secp256k1", 3)
  })

  it("Test Vector 4", () => {
    keyDerivationTest(0, "secp256k1", 4)
  })

  it("Test Vector 5", () => {
    keyDerivationTest(0, "secp256k1", 5)
  })
})
