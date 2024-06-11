const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const blogSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    snippet:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    }
},{timestamps:true})

const Blog = model("blogs",blogSchema)

module.exports  = {
    Blog
}