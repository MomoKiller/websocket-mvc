const chatService = require('../services/chatService');

exports.handleConnection = (ws) => {
  console.log('新客户端连接');

  ws.send('欢迎来到 WebSocket 聊天服务！');

  ws.on('message', (message) => {
    chatService.processMessage(ws, message);
  });

  ws.on('close', () => {
    console.log('客户端断开连接');
  });

  ws.on('open', () => {
    console.log('客户端开启');
  });
};
