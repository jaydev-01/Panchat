const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();


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

app.listen(process.env.PORT, ()=>{
    console.log("Active");
});
