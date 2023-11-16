import { AxiosPromise } from 'axios'
// @ts-ignore
import request from '@/service/request/index.ts'

// 查询参数接口
interface IQuery {
    [key: string]: any
}

// 响应接口
interface Res {
    code: number // 响应状态码
    data: any[] // 响应数据
    msg: string // 响应消息
}


// 请求例子
export function sayHello(queryParams: IQuery): AxiosPromise<Res> {
    return request({
        url: '/api/hello',
        method: 'get',
        params: queryParams
    })
}
