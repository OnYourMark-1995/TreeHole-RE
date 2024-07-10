const { jwtVerify } = require("../utils/jwtTool")
const { responseTool } = require("../utils/responseTool")

/**
 * 一个函数，用于根据 isTokenNecessary 的值 定制 “处理请求头 token 的中间件”
 * @param {Boolean} isTokenNecessary token 是否必要，如果必要，则请求头缺少 token 或 token校验失败 的情况，中间件不放行
 * @returns 处理请求头 token 的中间件
 */
module.exports = function checkTokenMiddleware (isTokenNecessary) {
  return (req, res, next) => {

    // 在请求头中添加 jwt 解析出来的数据，先初始化为 null
    req.userJwt = null

    //注意：在客户端 token需要手动发送，一般放在请求头，也可放在请求体，
    //这里客户端将 token 放在请求头中返回，并且命名为‘Access-Token’（由客户端定义，也可为tk，user_key等其他名称）
    const token = req.get('Access-Token')
    
    // 缺少 token 的情况
    if(!token){
      // 如果 token 不是必要的，则缺少 token，中间件直接放行 
      if(!isTokenNecessary){
        next()
        return
      }

      responseTool.sendJson(res, 401, [4102, '用户未登录'])
      return
    }
    
    const verifyResult = jwtVerify(token)
    // token 解析发生错误的情况
    if(verifyResult.error) {
      // 如果 token 不是必要的，则 token 解析发生错误时，中间件也直接放行 
      if(!isTokenNecessary){
        next()
        return
      }
      console.log(verifyResult.error);

      responseTool.sendJson(res, 401, [4103, 'token 校验失败'])
      return
    }
  
    //将用户从token传来的数据（创建token时放入的数据）解码后存放到req.userJwt中，方便后续使用
    req.userJwt = verifyResult.decode
    console.log("jwt verifyResult", verifyResult);
  
    next()
  }
}

// TODO: 有很多输出打印，需要去除
// module.exports = function (req, res, next) {
//   //注意：在客户端 token需要手动发送，一般放在请求头，也可放在请求体，
//   //这里我们假设客户端将 token 放在请求头中返回，并且命名为‘Access-Token’（由客户端定义，也可为tk，user_key等其他名称）
//   const token = req.get('Access-Token')

//   if(!token){
//     res.status(401)
//     res.json({
//       code:4102,
//       message: '用户未登录',
//       data: null
//     })
//     return
//   }

//   const verifyResult = jwtVerify(token)
//   if(verifyResult.error) {
//     console.log(verifyResult.error);
//     res.status(401)
//     res.json({
//       code: 4103,
//       msg: 'token 校验失败',
//       data: null
//     })
//     return
//   }

//   //将用户从token传来的数据（创建token时放入的数据）解码后存放到req.userJwt中，方便后续使用
//   req.userJwt = verifyResult.decode
//   console.log("jwt verifyResult", verifyResult);

//   next()
// }