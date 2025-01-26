import User from "../models/user.model.js";
import Message from "../models/message.model.js"

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error message: ", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderID: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages", error.message);
        res.status(500).json({error: "Internal Server Error"})   
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id

        let imageURL;
        // time stamp 1:25:29 uploading image

        const newMessage = new Message({
            senderId, receiverId, text, image: ""
        })

        await newMessage.save()

        // realtime functionality socket.io

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage: ", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}