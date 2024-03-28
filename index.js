const express = require('express');
const app = express();
require('./model/index')
const userController = require('./routes/index')

const port = 5000;

//middleware Function

const logRequest = (req,res,next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`)
    next()
}

app.use(express.json())

app.use('/api', logRequest,userController.router)



app.listen(port,()=>{
    console.log(`sever running on ${port}`)
})