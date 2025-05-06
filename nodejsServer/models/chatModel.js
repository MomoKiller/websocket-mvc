exports.createMessage = (rawMsg) => {
    return {
      // content: rawMsg.toString(),
      content: rawMsg.toString(),
      timestamp: Date.now()
    };
  };
  