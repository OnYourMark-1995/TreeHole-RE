export const isStringEmpty = (string) => {
  return string === '' ? true : false
}

export const patternCheck = (string, pattern) => {
  const regExp = new RegExp(pattern)
  return regExp.test(string)
}

export const isEmail = (string) => {
  const pattern = '^[A-Za-z0-9\\u4e00-\\u9fa5_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$'
  return patternCheck(string, pattern)
}

export const stringLengthCheck = (string, minLength, maxLength) => {
  if(string.length < minLength){
    return -1
  }
  if(string.length > maxLength){
    return 1
  }
  return 0
}