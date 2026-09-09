const express = require('express')
const app = express()


app.get("/", (req,res)=>{
    console.log("Our Group Project SwapSkills")
})
const PORT = 3007;
app.listen(PORT, ()=>{
    console.log(`app is listening on PORT ${PORT}`)
})