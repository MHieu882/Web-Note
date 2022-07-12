var mongoose = require('mongoose');
var user =new mongoose.Schema({
    fullname: String,
    username: String,
    email: String,//only 1 email
    password: String,//randme 6 word
    CreateAt: Date,
    role:String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
module.exports =mongoose.model('users', user);
