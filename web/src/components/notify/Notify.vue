<script setup>
import { ref } from 'vue';

const messageList = ref([])

const addMessage = (type, content) => {
  const message = { type, content }

  messageList.value.push(message)
  setTimeout(() => {
    messageList.value.shift()
  }, 4*1000)
}

const success = (messageContent) => {
  addMessage('success', messageContent)
} 

const error = (messageContent) => {
  addMessage('error', messageContent)
}

const warning = (messageContent) => {
  addMessage('warning', messageContent)
}

defineExpose({
  success,
  error,
  warning
})
</script>

<template>
  <Teleport to="body">
    <div class="notify-wrap">
      <TransitionGroup name="top-move-in">
        <div 
          v-for="message in messageList" 
          :key="message"
          class="notify-item"
          :class="[ 'notify-item-' + message.type ]" 
        >
          {{ message.content }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.notify-wrap{
  position: fixed;
  top: 70px;
  left: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;

  transform: translateX(-50%);
  z-index: 1000;
}

.notify-item{
  height: 18px;
  line-height: 18px;

  flex-grow: 0;
  padding: 7px 24px;
  margin-bottom: 14px;
  border-radius: 8px;

  font-size: 18px;
  white-space: nowrap;
  word-spacing: 1px;
}

.notify-item-success{
  color: #67c23a;
  background-color: #f0f9eb;
}

.notify-item-error{
  color: #f56c6c;
  background-color: #fef0f0;
}

.notify-item-warning{
  color: #e6a23c;
  background-color: #fdf6ec;
}

.top-move-in-move,
.top-move-in-enter-active,
.top-move-in-leave-active{
  transition: all 0.5s ease;
}

.top-move-in-enter-from,
.top-move-in-leave-to{
  opacity: 0;
  transform: translateY(-50%);
}

.top-move-in-leave-active{
  position: absolute;
}
</style>