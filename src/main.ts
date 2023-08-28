import './assets/main.scss'

import { createApp } from 'vue'

import App from './App.vue'

import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import FloatingVue, { Tooltip } from 'floating-vue'
import 'floating-vue/dist/style.css'

const app = createApp(App)

app.use(VCalendar, {})
app.use(FloatingVue,
  { themes: { tooltip: { placement: 'top', triggers: ['hover', 'focus', 'touch', 'click'], } } }
)
app.component('VTooltip', Tooltip)

app.mount('#app')
