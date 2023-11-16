import {ConfigEnv, defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// https://vitejs.dev/config/
export default (({mode}: ConfigEnv) => {
  let config = loadEnv(mode, process.cwd())
  return defineConfig({
    // 配置代理
    server: {
      port: Number(config.VITE_PORT), // 启动端口号（配置在.env)
      open: true, // 是否启动就打开浏览器
      // 反向代理
      proxy: {
        [config.VITE_BASE_API]: {
          target: config.VITE_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) =>
              path.replace(
                  new RegExp(`^${config.VITE_BASE_API}`),
                  config.VITE_TARGET_URL
              ), // 路径重写
        },
      },
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"), // path记得引入
        // 'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
      }
    }
  })
})
