<script setup>
import MessageCard from './MessageCard.vue';

const props = defineProps({
  messageList: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <TransitionGroup name="slide-in" tag="ul" class="message-list-wrap">
    <MessageCard 
      v-for="message in messageList" 
      :message="message" 
      :key="message.messageId"
    />
  </TransitionGroup>
</template>

<style scoped>
.message-list-wrap {
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.slide-in-enter-from {
  opacity: 0;
  transform: translateX(-40%);
}

.slide-in-enter-active {
  transition: all 0.4s ease-out;
}
</style>