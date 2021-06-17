import {Keys} from "./keys";

export type Address = Keys

export interface Account{
  usedAddresses: Address[],
  freshAddresses: Address[]
}