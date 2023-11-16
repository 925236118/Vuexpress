import express from 'express'
import routes from './routes/index'
import expressWs from "express-ws";
import wsRouter from './routes/wsRouter'
import cors from 'cors'
import path from "path";

const app = express()
expressWs(app);

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

routes(app, '/api')
// @ts-ignore
wsRouter(app, '/chat')

const PORT = 3000

// 启动
app.listen(PORT, async () => {
    console.log(`App is running at http://localhost:${PORT}`)
})
