const chatController = require('../controllers/chatController');

module.exports = function(ws, req) {
  // 简单路由逻辑（也可以根据 URL 来分发）
  chatController.handleConnection(ws);
};
