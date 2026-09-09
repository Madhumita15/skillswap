const express = require('express')
const app = express()


const PORT = 3007;
app.listen(PORT, ()=>{
    console.log(`app is listening on PORT ${PORT}`)
})