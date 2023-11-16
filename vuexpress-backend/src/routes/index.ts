import { Express, Request, Response, Router } from 'express'
import controllers from "../controllers";
// 路由配置接口
interface RouterConf {
    path: string,
    router: Router,
    meta?: any
}

// 路由配置
const routerConf: Array<RouterConf> = []

function routes(app: Express, route: string = '') {
    // 根目录
    app.get(route + '/', (req: Request, res: Response) => res.status(200).send('Hello Shinp!!!'))

    app.get(route + '/hello', controllers.sayHello)

    routerConf.forEach((conf) => app.use(conf.path, conf.router))
}

export default routes
