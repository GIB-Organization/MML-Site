export const numericEnumKeysArray = (enumValue:any)=>{
    const keys = Object.keys(enumValue)
    return keys.splice((keys.length/2), keys.length) as string[]
}