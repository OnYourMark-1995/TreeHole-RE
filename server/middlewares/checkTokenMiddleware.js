const { jwtVarify } = require("../utils/jwtTool")

// TODO: 有很多输出打印，需要去除
module.exports = function (req, res, next) {
  //注意：在客户端 token需要手动发送，一般放在请求头，也可放在请求体，
  //这里我们假设客户端将 token 放在请求头中返回，并且命名为‘Access-Token’（由客户端定义，也可为tk，user_key等其他名称）
  const token = req.get('Access-Token')

  if(!token){
    res.status(401)
    res.json({
      code:4102,
      message: '用户未登录',
      data: null
    })
    return
  }

  const varifyResult = jwtVarify(token)
  if(varifyResult.error) {
    console.log(varifyResult.error);
    res.status(401)
    res.json({
      code: 4103,
      msg: 'token 校验失败',
      data: null
    })
    return
  }

  //将用户从token传来的数据（创建token时放入的数据）解码后存放到req.userJwt中，方便后续使用
  req.userJwt = varifyResult.decode
  console.log("jwt varifyResult", varifyResult);

  next()
}