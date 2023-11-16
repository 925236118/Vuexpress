import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => {
        store.$patch(initialState);
    }
})

pinia.use(piniaPersist);

// 全局注册 store
export function setupStore(app: App<Element>) {
    app.use(pinia);
}

export default pinia;
