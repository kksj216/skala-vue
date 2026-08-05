import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Element Plus 모듈 및 필수 CSS Import
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Buefy 모듈
import Buefy from 'buefy'
import 'buefy/dist/css/buefy.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus) // Element Plus 사용 등록
app.use(Buefy) // Buefy 사용 등록

app.mount('#app')
