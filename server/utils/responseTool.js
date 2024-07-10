function createResponseResult (code, message, data) {
  return { code, message, data }
}

class ResponseTool{
  /**
   * 通用的返回函数
   * @param {*} res Express 框架的 response 对象
   * @param {*} status http响应的状态码
   * @param {Array} responseResult 数组，格式为 [ code, message, data = null ]，数组中的参数依次为 返回码、返回提示信息、用户请求的数据
   */
  sendJson(res, status, [ code, message, data = null ]){
    const responseResult = createResponseResult(code, message, data)

    res.status(status)
    res.json(responseResult)
  }

  /**
   * 成功响应
   * @param {*} res Express 框架的 response 对象
   * @param {Array} responseResult 待返回的数据，格式为 [ code, message, data = null ]，数组中的参数依次为 返回码、返回提示信息、用户请求的数据
   */
  success(res, responseResult) {
    this.sendJson(res, 200, responseResult)
  }

  /**
   * 失败响应
   * @param {*} res Express 框架的 response 对象
   * @param {Array} responseResult 待返回的数据，格式为 [ code, message, data = null ]，数组中的参数依次为 返回码、返回提示信息、用户请求的数据
   */
  fail(res, responseResult) {
    this.sendJson(res, 400, responseResult)
  }
}

const responseTool = new ResponseTool()

module.exports = { responseTool, createResponseResult }