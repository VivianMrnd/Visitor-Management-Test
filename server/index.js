const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./route/router')

require('dotenv').config();

try {
    mongoose.connect("mongodb+srv://vivianmiranda:announcementtester@euodootest.whkzxkk.mongodb.net/?retryWrites=true&w=majority")
    console.log('Successfully Connected to Database!');
} catch (error) {
    handleError(error);
}

app.use(require('cors')());
app.use(bodyparser.json());
app.use('/e-logbook', router);
app.listen(8000||PORT, ()=>{
    console.log("Now listening to port : 8000");
})


// import QRCode from "react-qr-code";
//       <QRCode value={JSON.stringify(generateDetails)}/>

