<template>
  <div class="view">
    Main page
    <p>{{ counterStore.count }}</p>
    <div>
      <Button type="primary" @click="increment">+1</Button>
      <Button type="primary" @click="clear">clear</Button>
    </div>
  </div>
</template>

<script setup>
console.log('this is main page')
import { useCounterStore } from '@/store/modules/counter.ts'
const counterStore = useCounterStore()

import {sayHello} from '@/service/api/index.ts'
const increment = () => {
  counterStore.increment()
}
const clear = () => {
  counterStore.$reset()
}

sayHello({})
  .then(res => {
    console.log(res.data);
  })
  .catch(e => {
    console.error(e);
  })
</script>

<style lang="scss" scoped>
.view {
  margin: 200px auto;
  text-align: center;
}
</style>
