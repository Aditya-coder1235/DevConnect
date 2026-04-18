const express = require('express')
const app = express()
require('dotenv').config()

const http = require("http")
const { Server } = require("socket.io")

const port = process.env.PORT
const dbConnect = require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dbConnect()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err))

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "https://devconnect101.vercel.app",
    credentials: true
}))

const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const projectRouter = require('./routes/project.route')
const conversationRouter = require('./routes/conversation.routes')
const messageRouter = require('./routes/message.routes')

app.get('/', (req, res) => {
    res.send('Hi, i am Root!')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/project', projectRouter)
app.use('/api/conversation', conversationRouter)
app.use('/api/message', messageRouter)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://devconnect101.vercel.app",
        credentials: true
    }
})

let onlineUsers = []

io.on("connection", (socket) => {

    console.log("User connected:", socket.id)

    socket.on("addUser", (userId) => {

        // console.log("addUser event received:", userId)

        const existing = onlineUsers.find(user => user.userId === userId)
        if (existing) {
            existing.socketId = socket.id
        } else {
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        }

        // console.log("Online users:", onlineUsers)
    })

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {

        // console.log("Message send event:", senderId, receiverId)

        const user = onlineUsers.find(
            user => user.userId === receiverId
        )

        if (user) {

            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            })
        }

    })

    socket.on("disconnect", () => {

        onlineUsers = onlineUsers.filter(
            user => user.socketId !== socket.id
        )

        console.log("User disconnected")
    })

})

server.listen(port, () => {
    console.log(`Server start on ${port}`)
})