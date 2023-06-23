const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.get("/", (req, res) => {
    res.json({message: "Welcome to minhtn3 authentication server"});
});
require('./src/routes/problem.routes')(app);
require('./src/routes/testcase.routes')(app);


// DB CONNECT
const db = require("./src/models");
const Categories = db.category;


console.log('Delay 10s before connect to DB');
setTimeout(function () {
    db.sequelize.sync().then(() => {
        console.log('Drop and Resync Db');
    }).catch((error) => {
        console.log(error);
    })
}, 1000)

const rpcServer = require('./src/grpc/index');
rpcServer.start(50051);