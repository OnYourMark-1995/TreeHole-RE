<script setup>
import { watch } from 'vue';
import MessageCard from './MessageCard.vue';

const props = defineProps({
  messageList: {
    type: Array,
    required: true,
  }
})

let elSlideInDelay = 0 // 消息逐条进入的过渡延时

watch(
  () => props.messageList.length,
  (newValue) => {
    // 当 messageList 的长度增加，即有新消息加入时，重置延时
    elSlideInDelay = 0
  }
)

// 在元素被插入到 DOM 之前被调用，用这个来设置元素的 "enter-from" 状态
const onBeforeEnter = (el) => {
  if(props.messageList.length <= 10) return
  el.classList.add('slide-in-enter-from')
}

// 在元素被插入到 DOM 之后的下一帧被调用，用这个来开始进入动画
const onEnter = (el, done) => {
  if(props.messageList.length <= 10) return
  elSlideInDelay = elSlideInDelay + 100 //进入延时

  // 多个 元素延迟 依次进入
  setTimeout(() => {
    el.classList.remove('slide-in-enter-from')
    el.classList.add('slide-in-enter-active')
    done()
  }, elSlideInDelay)
}

// 当进入过渡完成时（即@enter钩子调用done以后）调用。
const onAfterEnter = (el) => {
  if(props.messageList.length <= 10) return

  // 进入过渡以后，在过渡效果完成后，去除用于过渡的 class样式。这个延迟时间
  // 一定要大于过渡时间，否则过渡未完成用于过渡的样式就被撤销了。
  // 其实这个钩子可写可不写，即不用清除这个 class样式也没问题，不过如果使用
  // vue3原生的基于CSS的Transition（即不使用钩子）是会清除用于过渡的 class样式的，所以我也尝试做一下。
  setTimeout(() => {
    el.classList.remove('slide-in-enter-active')
  }, 2000)
  
}
</script>

<template>
  <!-- 为了使前10条数据插入的时候不触发过渡效果（即开屏的时候）
   用钩子函数控制过渡效果 -->
  <TransitionGroup 
    @before-enter="onBeforeEnter"
    @enter="onEnter" 
    @after-enter="onAfterEnter"
    move-class="slide-in-move"
    :css="false"
    tag="ul" 
    class="message-list-wrap"
  >
  <!-- 
  <TransitionGroup 
    name="slide-in"
    tag="ul"
    class="message-list-wrap"
  > -->
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
  transform: translateX(40%);
}

.slide-in-move,
.slide-in-enter-active {
  transition: all 0.4s ease;
}

</style>