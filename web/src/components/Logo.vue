<script setup>

const props = defineProps(['height'])
</script>

<template>
  <div class="logo" :style="{ height: height }">
    <!-- <img src="../../public/3/MikuTalk-01.jpg" alt=""> -->
    <img src="../../public\3\TreeHole-01.jpg" alt="">
  </div>
</template>

<style scoped>
.logo{
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img{
  display: block;
  height: 100%;
}

</style>
