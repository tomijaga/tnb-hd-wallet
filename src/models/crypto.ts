export enum Curve {
  ed25519 = "ed25519",
  secp256k1 = "secp256k1",
  nist256p1 = "nist256p1",
}

export interface CoinDetails {
  purpose: number;
  coinType: number;
  curve: keyof typeof Curve;
}
