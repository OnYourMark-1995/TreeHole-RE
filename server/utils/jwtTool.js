const jwt = require('jsonwebtoken')
const jwtConfig = require("../config/jwtConfig")

const jwtSign = (data) => {
  return jwt.sign(data, jwtConfig.secret, { 
    expiresIn: jwtConfig.expiresIn 
  })
}

const jwtVerify = (token) => {
  let result
  jwt.verify(token, jwtConfig.secret, (error, decode) => {
    result = {
      error: error,
      decode: decode
    }
  })
  return result
}

module.exports = { jwtSign, jwtVerify }