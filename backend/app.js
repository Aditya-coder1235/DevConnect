const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT;
const dbConnect = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dbConnect().then(() => console.log("Connected to DB")).catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const authRouter = require('./routes/auth.routes');
const userRouter=require('./routes/user.routes');
const projectRouter=require('./routes/project.route');

app.get('/', (req, res) => {
    res.send('Hi, i am Root!');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);


app.listen(port, () => {
    console.log(`server srart on ${port} port`);
})