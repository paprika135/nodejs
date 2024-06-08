const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({name:String,body:String});

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:String,
    rating:Number,
    pages:Number,
    genres:[String],
    reviews:[reviewSchema]
});

const Blog = mongoose.model('books',blogSchema);

module.exports = {
    Blog
}
