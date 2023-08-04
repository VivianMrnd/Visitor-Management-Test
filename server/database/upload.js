const mongoose = require('mongoose');
// const announcementRouter = require('./routes/announcementroute')

const announcements = mongoose.Schema({
    name: String,
    image:{
        data:Buffer,
        contentType: String
    },
    status: String,
    dates: {
        created:  {type: Date, default: Date.now},
    }
})

const announcement = mongoose.model('announcement', announcements);
module.exports = announcement;

// https://dev.to/yosraskhiri/how-to-upload-an-image-using-mern-stack-1j95 