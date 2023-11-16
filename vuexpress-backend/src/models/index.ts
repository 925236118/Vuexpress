import mongoose from 'mongoose'
import messageSchema from "./message"

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/express-chat')
}

main()
  .then(res => {
    console.log('mongo链接成功')
  })
  .catch(err => {
    console.log(err)
    console.log('mongo链接失败')
  })

const model = {
    Message: mongoose.model('Message', messageSchema)
}
export default model
