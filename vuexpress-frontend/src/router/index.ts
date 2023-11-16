import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        name: 'Main',
        path: '/',
        meta: {
            title: 'Main',
        },
        // @ts-ignore
        component: () => import('@/views/Main/Main.vue'),
    },
    {
        name: 'Chat',
        path: '/chat',
        meta: {
            title: 'Chat',
        },
        // @ts-ignore
        component: () => import('@/views/Chat/Chat.vue'),
    },
    // 页面不存在时的路由
    {
        name: '404',
        path: '/:pathMatch(.*)*',
        meta: {
            title: '404',
        },
        // @ts-ignore
        component: () => import('@/views/Error/404.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
