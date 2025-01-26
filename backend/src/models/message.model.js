import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        senderID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recieverID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        }
    },
    {timestamps: true}
);

const Message = mongoose.model("Message", messageSchemaa);
export default Message;