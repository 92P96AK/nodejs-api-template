const charactersToInclude = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export const generateRandomString = length => {
   let result = ''
   const charactersLength = charactersToInclude.length
   for (let i = 0; i < length; i++) {
      result += charactersToInclude.charAt(
         Math.floor(Math.random() * charactersLength),
      )
   }

   return result
}
