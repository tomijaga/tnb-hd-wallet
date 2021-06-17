import {Hex, Path} from "./constants"

export interface Keys{
  accountIndex?: number,
  addressIndex?: number,
  path: Path,
  chainCode?: Hex,
  publicKey: Hex,
  privateKey: Hex,
}