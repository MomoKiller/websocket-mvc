const WebSocket = require('ws');
const wsRouter = require('./routes/wsRouter');

// 创建 WebSocket 服务
const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('WebSocket 服务运行在 ws://localhost:8080');
});

// 路由分发连接
wss.on('connection', (ws, req) => {
  wsRouter(ws, req);
});
