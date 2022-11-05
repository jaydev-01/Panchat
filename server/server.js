const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors : {
        origin : "*"
    }
});


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
var corsOptions = {
    origin: process.env.MAIN_URL,
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions));
// app.use(bodyParser.json());
// const userRoutes = require("./routes/userRouter")


io.on("connection", (socket) => {
    console.log("What is socket : ", socket);
    console.log("Socket is active to be connected");

    socket.on("chat", (payload) => {
        console.log("What is payload", payload);
        io.emit("chat", payload);
    })
})

const db = require('./models');
db.mongoose.connect(db.url, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Connected to the database");
}).catch(error => {
    console.log("Connot connect to the database!",error);
    process.exit();
})


require('./routes/user.routes')(app);

server.listen(process.env.PORT, ()=>{
    console.log("Active");
});
