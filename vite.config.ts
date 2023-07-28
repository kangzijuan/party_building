import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~@': path.resolve(__dirname, 'src')
		}
	},
	server: {
		host: '0.0.0.0', //IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
		port: 3000, // 服务端口号
		cors: true, // 允许跨域
		proxy: {
			// 配置自定义代理规则
			// http://pts.dct99.com:66/partyBuildCockpitEdu/api/userList
			// localhost:3000/api/userList
			'/api': {
				target: 'http://pts.dct99.com:66/partyBuildCockpitEdu',
				changeOrigin: true,
				ws: true,
				rewrite: path => path.replace(/^\/api/, '/api')
			}
		}
	}
})
