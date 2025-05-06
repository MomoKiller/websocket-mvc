<template>
  <section class="main-wrap">

    {{ returnMsg }}
    
    <br>
    <input type="text" v-model="sendMsg">
    <button @click="handleSendMsg">Send</button>

    <br>
    <button @click="handleOpen">Open</button>
    <button @click="handleClose">Close</button>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sendMsg = ref('');

const returnMsg = ref('');

const ws = ref();

const handleSendMsg = () => {
  ws.value.send(sendMsg.value);  
};

const handleOpen = () => {
  initWebSocket();
};

const handleClose = () => {
  ws.value.close();
};

const initWebSocket = () => {
  ws.value = new WebSocket("ws://localhost:8080");
    
  ws.value.onopen = () => {
    ws.value.send("连接成功");
  };
  
  ws.value.onmessage = (event) => {
    console.log("收到消息:", event.data);
    returnMsg.value = event.data;
  };

};

onMounted(() => {

  initWebSocket();


});

</script>

<style scoped>

</style>
