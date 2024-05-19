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
  }
}
