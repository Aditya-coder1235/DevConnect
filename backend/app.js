const express = require('express')
const app = express()
require('dotenv').config()

const http = require("http")
const { Server } = require("socket.io")
const WebSocket = require('ws')
const { setupWSConnection } = require('y-websocket/bin/utils')

const port = process.env.PORT
const dbConnect = require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dbConnect()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err))

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
    "http://localhost:5173",
    "https://devconnect101.vercel.app",
]

app.use(cors({
    origin: allowedOrigins,
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

const wss = new WebSocket.Server({server })

wss.on('connection', (ws, req) => {
    setupWSConnection(ws, req)
})

console.log('Yjs WebSocket server running on port 8080')

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
})

let onlineUsers = []

io.on("connection", (socket) => {

    console.log("User connected:", socket.id)

    socket.on("addUser", (userId) => {
        const existing = onlineUsers.find(user => user.userId === userId)
        if (existing) {
            existing.socketId = socket.id
        } else {
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        }
    })

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
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


    socket.on("sendCodeInvite", ({ senderId, senderName, receiverId, roomId }) => {
        const receiver = onlineUsers.find(user => user.userId === receiverId)

        if (receiver) {
            io.to(receiver.socketId).emit("getCodeInvite", {
                senderId,
                senderName,
                roomId
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