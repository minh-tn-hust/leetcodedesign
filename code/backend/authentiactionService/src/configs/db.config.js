require('dotenv').config()
const config = {
    HOST: "localhost",
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: process.env.MYSQL_DATABASE,
    dialect: "mysql",
    pool: {
        max: Number(process.env.MYSQL_MAX_CONNECTION),
        min: Number(process.env.MYSQL_MIN_CONNECTION),
        acquire: Number(process.env.MYSQL_ACQUIRE),
        idle: Number(process.env.MYSQL_IDLE)
    }
}
module.exports = config;