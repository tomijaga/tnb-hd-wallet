declare module "ethereum-public-key-to-address"{
  function publicKeyToAddress(key: string | Buffer): string; 
  export = publicKeyToAddress;
}