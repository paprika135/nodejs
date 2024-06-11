const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const blogSchema = new Schema({
    title:String,
    author:String
})

const Blog = model("blogs",blogSchema)

module.exports  = {
    Blog
}