

## 项目结构建议

```
websocket-mvc/
├── controllers/
│   └── chatController.js
├── models/
│   └── chatModel.js
├── routes/
│   └── wsRouter.js
├── services/
│   └── chatService.js
├── server.js
├── package.json
```

---

##  1. 初始化项目

```bash
mkdir websocket-mvc && cd websocket-mvc
npm init -y
npm install ws
```

---

##  2. 编写核心代码

###  `server.js`（启动服务）

```js
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
```

---

###  `routes/wsRouter.js`（路由层）

```js
const chatController = require('../controllers/chatController');

module.exports = function(ws, req) {
  // 简单路由逻辑（也可以根据 URL 来分发）
  chatController.handleConnection(ws);
};
```

---

###  `controllers/chatController.js`（控制器）

```js
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
};
```

---

###  `services/chatService.js`（业务逻辑）

```js
const chatModel = require('../models/chatModel');

exports.processMessage = (ws, message) => {
  console.log('收到消息:', message);
  
  const msgObj = chatModel.createMessage(message);

  // 这里可以加入逻辑，比如广播、保存消息、过滤等
  ws.send(`你说的是：${msgObj.content}`);
};
```

---

###  `models/chatModel.js`（数据模型）

```js
exports.createMessage = (rawMsg) => {
  return {
    content: rawMsg.toString(),
    timestamp: Date.now()
  };
};
```

---

##  3. 启动服务

```bash
node server.js
```

---

##  4. 浏览器测试代码（可放在 HTML 中）

```html
<script>
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    ws.send("你好，服务器！");
  };

  ws.onmessage = (event) => {
    console.log("收到消息:", event.data);
  };
</script>
```

