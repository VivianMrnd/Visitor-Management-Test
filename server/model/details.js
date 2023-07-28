const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const details = new Schema({
    firstname: String,
    lastname:String,
    timein:String,
    timeout:String
})

const logindata = mongoose.model('e-logins', details);
module.exports = logindata;