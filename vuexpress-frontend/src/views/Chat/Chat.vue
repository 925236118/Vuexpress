<template>
  <div>
    Chat page
    <div>
      <Button @click="connectServer">连接</Button>
      <Button @click="reconnect">重新连接</Button>
      <Button @click="disconnectServer">断开连接</Button>
    </div>
    <div>
      <Input v-model="username" placeholder="用户名"></Input>
      <Input v-model="message" placeholder="消息内容"></Input>
      <Button @click="sendMessage">发送数据</Button>
    </div>

    <ul class="message-list">
      <li v-for="(msgItem, index) in reverseMsgList" :key="index" :class="msgItem.type" class="message-item">
        <span class="username">{{ msgItem.username }}</span> @
        <span class="datetime">{{formatTimeString(msgItem.time)}}</span> :
        <span class="content">{{ msgItem.content }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {Input} from "view-ui-plus";

// ws.value.readyState
// 1 已连接
// 3 已断开
let ws = ref(null)
let connectState = ref(false)

let message = ref('')
let username = ref('')
let msgList = ref([])


const wsInit = () => {
  let ws = new WebSocket('ws://127.0.0.1:3000/chat')
  ws.onopen = () => {
    msgList.value.push({type: 'info', username: '你', content: '连接成功', time: new Date()})
    connectState.value = true
    ws.send(JSON.stringify({type: 'server', username: username.value, content: 'connected', time: new Date()}))
  }
  ws.onmessage = (msg) => {
    let messageData = JSON.parse(msg.data)
    let listShowTypes = ['info', 'error', 'message']
    if (listShowTypes.includes(messageData.type)) {
      msgList.value.push(messageData)
    } else if (messageData.type === 'echo') {
      messageData.username = '你'
      msgList.value.push(messageData)
    } else if (messageData.type === 'init') {
      msgList.value = [
        ...msgList.value.filter(item => ['info', 'error'].includes(item.type)),
        ...messageData.content
      ]

    }
  }
  ws.onclose = () => {
    msgList.value.push({type: 'info', username: '你', content: '连接断开', time: new Date()})
    connectState.value = false
  }
  return ws
}
const reconnect = () => {
  if (ws.value.readyState === 1) {
    ws.value.close()
  }
  ws.value = wsInit()
}
const connectServer = () => {
  if (!username.value) {
    msgList.value.push({type: 'error', username: '你', content: '用户名不能为空', time: new Date()})
    return
  }
  ws.value = wsInit()
}
const disconnectServer = () => {
  ws.value.close()
}
const formatTimeString = (time) => {
  if (!time) {
    return ''
  }
  time = new Date(time)
  let y = time.getFullYear()
  let mon = ('0' + time.getMonth()).slice(-2)
  let d = ('0' + time.getDate()).slice(-2)
  let h = ('0' + time.getHours()).slice(-2)
  let m = ('0' + time.getMinutes()).slice(-2)
  let s = ('0' + time.getSeconds()).slice(-2)
  return `${y}/${mon}/${d} ${h}:${m}:${s}`
}
const sendMessage = () => {
  if (!message.value) {
    return
  }
  let data = {type: 'message', username: username.value, content: message.value, time: new Date()}
  ws.value.send(JSON.stringify(data))
  message.value = ''
}
const reverseMsgList = computed(() => {
  let result = []
  for (let i = msgList.value.length - 1; i >= 0; i--) {
    result.push(msgList.value[i])
  }
  return result
})

</script>

<style lang="scss" scoped>

</style>
