import { createApp } from 'vue'
import Index from './index.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(Index).use(Antd);
app.mount("#app");