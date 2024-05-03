export const isStringEmpty = (string) => {
  return string === '' ? true : false
}

export const isEmail = (string) => {
  const emailRegExp = new RegExp('^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$')
  return emailRegExp.test(string)
}

// export const stringLengthCheck = (string, minLength, maxLength) => {
//   if(string.length < minLength){
//     throw new Error(`字符不能少于${minLength}`)
//   }
//   if(string.length > maxLength){
//     throw new Error(`字符不能多于${minLength}`)
//   }
// }