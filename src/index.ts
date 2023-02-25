// import {sum} from '@/sum';
import App from '@/App.vue'
import {createApp} from 'vue';
import router from './router';
import {createPinia} from 'pinia';
import {createI18n} from 'vue-i18n';
import './index.css';


createApp(App)
.use(router)
.use(createPinia())
.use(createI18n({
    Legacy: false,
    locale: 'en',
})).mount('#root')