import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
let app = createApp(App);
app.config.globalProperties.myaxios = axios;

app.use(store).use(router).mount('#app')
