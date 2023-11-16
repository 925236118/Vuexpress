import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index.ts'

import 'normalize.css'

import ViewUIPlus from 'view-ui-plus'
import iViewOptions from '@/config/iViewOptions.ts'
// import './style.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import { setupStore } from './store'

const app = createApp(App)

app.use(router)
app.use(ViewUIPlus, iViewOptions)
app.use(setupStore)

app.mount('#app')
