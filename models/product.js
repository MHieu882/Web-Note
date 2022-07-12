const mongoose = require('mongoose')
const Schema= mongoose.Schema;
const Products =new Schema({
    title: String,
    content: String,
    img: String,
    slug: String,
    user:String,
})

module.exports = mongoose.model('Products',Products);