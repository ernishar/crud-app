const express = require('express');
const app = express();
require('./model/index')
const userController = require('./routes/index')

const port = 5000;


app.use(express.json())
// app.use(customMiddleware)
app.use('/api',userController.router)



app.listen(port,()=>{
    console.log(`sever running on ${port}`)
})