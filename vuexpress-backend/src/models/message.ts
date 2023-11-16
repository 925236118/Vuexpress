import * as mongoose from "mongoose";

const Schema = mongoose.Schema

const messageSchema = new Schema({
    // id: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // },
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})

export default messageSchema
