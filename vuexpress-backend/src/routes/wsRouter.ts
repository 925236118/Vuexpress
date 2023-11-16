import model from '../models/index'
import { Application } from 'express-ws'

const Message = model.Message
const wsChatClientList :any[] = []
let id = 0

function initWsRouter (app: Application, route: string) {
    app.ws(route + '/', (ws) => {
        wsChatClientList.push({id, ws})
        const clientId = id
        id ++
        ws.on('message', async function(msg) {
            console.log('msg' + msg);
            // ws.send('get ' + msg)
            try {
                let data = JSON.parse(msg.toString())
                if (data.type === 'server') {
                    switch (data.content) {
                        case 'connected':
                            const messageList = await Message.find({})
                            ws.send(JSON.stringify({type: 'init', username: 'server', content: messageList}))
                            ws.send(JSON.stringify({type: 'info', username: 'server', content: '你好！ ' + data.username, time: new Date()}))
                            break
                    }
                } else if (data.type === 'message') {
                    let messageModel = new Message({
                        username: data.username,
                        content: data.content,
                        time: new Date(data.time)
                    })
                    await messageModel.save()
                    wsChatClientList.forEach((server, index) => {
                        if (server.id !== clientId) {
                            server.ws.send(JSON.stringify(data))
                        } else {
                            let echoData = {...data}
                            echoData.type = 'echo'
                            ws.send(JSON.stringify(echoData))
                        }
                    })
                }
            } catch (e) {
                console.log(e);
                ws.send(JSON.stringify({type: 'error', username: 'server', content: JSON.stringify(e), time: new Date()}))
            }
        });
        ws.on('close', function(msg) {
            console.log(clientId + ' is closed');
            wsChatClientList.splice(wsChatClientList.findIndex(item => item.id === clientId), 1)
        });
        console.log(clientId + ' is connect')
        // console.log('socket', Object.keys(req), Object.keys(ws) );
    })
}


export default initWsRouter
