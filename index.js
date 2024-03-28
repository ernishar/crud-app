const express = require('express');
const app = express();
require('./config/index')
const userController = require('./routes/index')
const upload= require('./middleware/fileUpload.js');
require('dotenv').config();
const port = 5000;


app.post('/upload', upload.single('image'), (req, res) => {
    if(!req.file){
        return res.status(400).json({error: 'No file uploaded'});
    }
    res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename });
})


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