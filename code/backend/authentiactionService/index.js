const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// ROUTES
app.get("/", (req, res) => {
    res.json({ message: "Welcome to minhtn3 authentication server" });
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
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

db.sequelize.sync({force : true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
})