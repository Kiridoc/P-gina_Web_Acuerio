
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'material-design-icons-iconfont/dist/material-design-icons.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// v-mask
import { VueMaskDirective } from 'v-mask';

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.directive('mask', VueMaskDirective);

app.mount('#app')
