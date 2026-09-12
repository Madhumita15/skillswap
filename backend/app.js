const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require('dotenv').config()

const express = require('express')
const dbCon = require('./src/config/dbCon')
const app = express()
const router = require('./src/router/index')
const cookieParser = require('cookie-parser')


dbCon()
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)


const PORT = 3007;
app.listen(PORT, () => {
    console.log(`app is listening on PORT ${PORT}`)
})