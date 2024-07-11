<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(['height'])

const router = useRouter()
</script>

<template>
  <div @click="() => router.push('/home')" class="logo" :style="{ height: height }">
    <img src="/images/TreeHole-01.jpg" alt="">
  </div>
</template>

<style>
.logo{
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.logo img{
  display: block;
  height: 100%;
}

</style>
