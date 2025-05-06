const chatModel = require('../models/chatModel');

exports.processMessage = (ws, message) => {
  console.log('收到消息:', message);
  
  const msgObj = chatModel.createMessage(message);

  // 这里可以加入逻辑，比如广播、保存消息、过滤等
  ws.send(`服务器消息：${msgObj.content}`);
};
