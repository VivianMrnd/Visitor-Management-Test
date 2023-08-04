const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const details = new Schema({
    // firstname: String,
    // lastname:String,
    // timein:String,
    // timeout:String
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

const logindata = mongoose.model('e-logins', details);
module.exports = logindata;