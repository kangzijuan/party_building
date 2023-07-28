import { createApp } from 'vue'
import '@/assets/scss/global.scss'
import '@/assets/fonts/fonts.scss'
import App from './App.vue'
/**
 * 状态管理
 */
import {createPinia} from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist'
/**
 * 路由
 */
import { getRouter } from './router'

/**
 * element plus
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/**
 * 蚂蚁UI
 */
//
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
const app = createApp(App)
app.use(Antd).use(ElementPlus).use(createPinia().use(piniaPluginPersist))
    .use(getRouter())
    .mount('#app')
