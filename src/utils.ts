export const pathRegex = new RegExp("^m(\\/[0-9]+')+$");

export const hexRegex = new RegExp("^(0x)?[0-9a-fA-F]{1,}$")

export const isValidHex = (hex: string)=>{
  return hexRegex.test(hex)
}