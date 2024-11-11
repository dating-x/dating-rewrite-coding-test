import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/Router';
import i18n, { setDefaultLocale } from '@/Services/I18n';
import store from '@/Store';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

setDefaultLocale(window.appConfig.locale);

app.mount('#app');
