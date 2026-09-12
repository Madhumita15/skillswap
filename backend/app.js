const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require('dotenv').config()

const express = require('express');
const dbCon = require('./src/config/dbCon');
const app = express()
const router = require('./src/router/index')


dbCon()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)


const PORT = 3007;
app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});