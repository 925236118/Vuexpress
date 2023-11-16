import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 示例
const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // 配置基础请求地址（配置方法在前面的 env 环境）
    timeout: 10000, // 请求超时时间
    headers: { 'Content-Type': 'application/json;charset=utf-8' }, // 请求头
})

// 请求拦截
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // config 可以拿到我们发送的请求内容，在这里可以配置请求权限，是否有token，
        // 根据自己的业务来写逻辑，也可以在这里根据需求修改请求头，请求类型请求时间。。。。
        // console.log('config', config)
        return config // 这里必须要 return出去
    },
    (err: any) => {
        // 请求出错，关闭 Loading，用 Promise 返回错误
        // console.error('request err', err)
        return Promise.reject(err)
    }
)

// 响应拦截
request.interceptors.response.use(
    (response: AxiosResponse) => {
        // 请求内容响应回来，可以在这里做接口判断，可以通过后端返回请求状态码判断，根据后端接口来
        const { data } = response
        return data
    },
    (err: any) => {
        // 响应出错，关闭 Loading，用 Promise 返回错误
        // console.error(err)
        return Promise.reject(err)
    }
)

export default request;
