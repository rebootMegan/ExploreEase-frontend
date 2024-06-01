import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from '/@/App.vue';
import router from '/@/router';
import ElementPlus from 'element-plus';
import '/@/theme/index.scss';
import 'animate.css';

const app = createApp(App);

app.use(pinia).use(router).use(ElementPlus)

app.mount('#app');


