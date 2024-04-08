/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import store from './Stores.js'
// import XLSX from 'xlsx'
// import VueExcelXlsx from "vue-excel-xlsx"

// import 'vuetify/dist/vuetify.css';
loadFonts()
const app = createApp(App)
app.use(vuetify)
app.use(store);
app.use(createPinia())
app.use(router)
app.mount('#app')
// app.use(VueExcelXlsx)
