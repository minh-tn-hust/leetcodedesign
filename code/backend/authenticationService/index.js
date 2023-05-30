const express = require("express");
const cors = require("cors");
var morgan = require('morgan')

require('dotenv').config();



const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware for logging request
app.use(morgan('combined'))

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// ROUTES
app.get("/", (req, res) => {
    res.json({message: "Welcome to minhtn3 authentication server"});
});
require('./src/routes/auth.routes')(app);


// DB CONNECT
const db = require("./src/models");
const Role = db.role;

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "mod"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

console.log('Delay 10s before connect to DB');
setTimeout(function() {
    db.sequelize.sync({force: true}).then(() => {
        console.log('Drop and Resync Db');
        initial();
    }).catch((error) => {
        console.log(error);
    })
}, 100)