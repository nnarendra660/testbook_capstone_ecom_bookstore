//Schema of modal
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:String,
    url:String,
    title:Object,
    price:Object
});
//Modal defined
const Products = new mongoose.model("products",productSchema);

module.exports = Products;