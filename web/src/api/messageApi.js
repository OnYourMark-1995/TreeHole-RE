import request from '../utils/request';

export default {
  sendMessage: (messageContent, date, userId) => {
    console.log({
      content: messageContent,
      date,
      userId
    });
    return request.post('/message/add', {
      content: messageContent,
      date,
      userId
    })
  },

  getMessage: (leastMessageId) => {
    return request.get(`/message/get-message/${leastMessageId}`)
  },

  getUserSendedMessage: (leastMessageId) => {
    return request.post('/message/get-message/user/sended', { leastMessageId })
  },

  getUserLikedMessage: (leastLikeDetailId) => {
    return request.post('/message/get-message/user/liked', { leastLikeDetailId })
  },

  // TODO:考虑是否要使用中。
  // closeSSEConnection: (lastEventId) => {
  //   return request.get(`/message/sse/close/${lastEventId}`)
  // }
}
