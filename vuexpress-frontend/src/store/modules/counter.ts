// store/modules/counter.ts
import { defineStore } from 'pinia'; // 引入 defineStore
import {ref} from 'vue';

// 创建一个 counter store
export const useCounterStore = defineStore(
    'counter',
    () => {
        // 创建一个 count 变量
        const count = ref(0);

        // 创建一个 increment 方法
        const increment = () => count.value++;

        // 返回 count 和 increment
        return {
            count,
            increment,
        };
    },
    { persist: true }
);
