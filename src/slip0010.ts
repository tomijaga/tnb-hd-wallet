
import {
  derivePath as deriveEd25519Path,
  getMasterKeyFromSeed as getEd25519MasterKeyFromSeed,
  getPublicKey as computeEd25519PublicKey,
} from "ed25519-hd-key";

import { 
  BIP32Interface,
  fromSeed as bip32FromSeed,
  fromBase58 as bip32FromBase53,
  fromPublicKey as bip32FromPublicKey,
  fromPrivateKey as bip32FromPrivateKey
  } from "bip32"
  
import { Address, Account, Curve, Path, Hex, MAX_ADDRESS_GAP } from "./models";

type Keys = {
  key: Buffer;
  chainCode: Buffer;
};


interface DerivationSchemeInterface{
  derivePath(path: Path): Address;
  masterKey:Address;
}

 abstract class Derivation implements DerivationSchemeInterface{
  readonly curve: keyof typeof Curve
  protected readonly seedBuffer: Buffer 

  constructor(_curve: keyof typeof Curve, _seed:Hex| Buffer){
    this.curve = _curve
    if (typeof _seed === "string"){
      this.seedBuffer = Buffer.from(_seed, "hex")
    }else{
      this.seedBuffer = _seed
    }

     if (!(this.seedBuffer.length >= 16 && this.seedBuffer.length <= 64)){
      throw new Error(`Invalid seed: Seed has to be between 128 and 516 bits \nSeed: ${this.seed} \nSeedLength: ${this.seedBuffer.length}`);
   }
  }

  

  protected abstract formatKeys(keys: any, path:Path): Address
  protected abstract curveSpecificDerivation(path:Path): Address
  abstract get masterKey(): Address

  public derivePath(path: Path){
    if (path ==="m"){
      return this.masterKey
    }
   return this.curveSpecificDerivation(path)
  }

  get seed(){
    return this.seedBuffer.toString("hex")
  }
}


class Ed25519 extends Derivation{
  constructor(seed:Hex| Buffer){
    super("ed25519", seed)
  }

  formatKeys({key, chainCode}: Keys, path: Path){
    return {
      path, 
      publicKey: this.computePublicKey(key) ,
      chainCode: chainCode.toString("hex"),
      privateKey: key.toString("hex")
    }
  }
  
  curveSpecificDerivation(path: Path){
    const addressKeys = deriveEd25519Path(path, this.seed)
   return this.formatKeys(addressKeys, path)
  }

  get masterKey(){
    const masterKeys = getEd25519MasterKeyFromSeed(this.seed)
    return this.formatKeys(masterKeys, "m")
  }

  private computePublicKey(privateKey: Hex | Buffer , withZeroByte : boolean = true){
    if (typeof privateKey === "string"){
      privateKey = Buffer.from(privateKey, "hex")
    }
    return computeEd25519PublicKey(privateKey, withZeroByte ).toString("hex")
  }
}

class Secp256k1 extends Derivation{
  private bip32: BIP32Interface
  constructor(seed: Hex| Buffer){
    super("secp256k1", seed)
    this.bip32 = bip32FromSeed(this.seedBuffer)
  }

formatKeys(bip32Address: BIP32Interface , path: Path){
  
  if (!bip32Address.privateKey) throw new Error("Private Key is Invalid")
  return {
    path,
    publicKey: bip32Address.publicKey.toString("hex"),
    chainCode: bip32Address.chainCode.toString("hex"),
    privateKey: bip32Address.privateKey.toString("hex")
  }
}

   curveSpecificDerivation(path: Path){
     const bip32address = this.bip32.derivePath(path)
   return this.formatKeys(bip32address, path)
  }

  get masterKey(){
    return  this.formatKeys(this.bip32, "m")
  }

}

export class Slip10Derivation implements DerivationSchemeInterface{
  curve: keyof typeof Curve;
  seed: string
  private derivationScheme: Derivation;

  constructor(_curve: keyof typeof Curve, _seed: Hex){
    this.curve = _curve;
    this.seed = _seed

    switch(_curve){
    case Curve.ed25519:
    this.derivationScheme = new Ed25519(_seed) as Derivation
    break;
    case Curve.secp256k1:
    this.derivationScheme = new Secp256k1(_seed) as Derivation
    break;
    default:
    throw new Error(`Curve '${_curve}' not supported`)
  }
  }

  derivePath(path:Path){
    return this.derivationScheme.derivePath(path)
  }

  get masterKey(){
    return this.derivationScheme.masterKey
  }
}

