import './assets/main.scss'

import { createApp } from 'vue'

import App from './App.vue'

import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import { Tooltip } from 'floating-vue'
import 'floating-vue/dist/style.css'

const app = createApp(App)

app.use(VCalendar, {})
app.component('VTooltip', Tooltip)

app.mount('#app')
