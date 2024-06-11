const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city:{type:String,default:"阜阳临泉"},
    location:{type:String,default:"安徽西北角的一个小县城"}
})

const User = new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    createAt:{
        type:Date,
        default:()=> Date.now()
    },
    updateAt:{
        type:Date,
        default:()=> Date.now()
    },
    hobbles:[String],
    address:addressSchema,
    bestFriend:{type:mongoose.SchemaTypes.ObjectId,ref:"user"}
});


//在User Schema上添加方法
User.method("sayHi",function(){
    console.log(`hi this is ${this.name}`);
})

//在User Schema上添加静态方法
User.statics.sayHi = async function (name){
    return this.where({name});
}

User.virtual("VirtualAge").get(function(){
    return `${this.name} <${this.age}>`
});

//添加pre中间件，它是在save()方法之前执行的,我们可以在save之前或者说正式向collection中追加之前对添加的document做一些额外的事。
User.pre("save",function(next){
    this.name = this.name + "pre";
    next();//使用next方法将数据传递到下一个middleWare，这个有点类似于express的中间件。
})

//添加post中间件，这个中间件是在想数据库添加了数据之后执行的
User.post("save",function(doc,next){
    console.log("向数据库中添加了一条document，添加的document是");
    console.log(doc);
    next();
})

const Users = mongoose.model("user",User);


module.exports = {
    Users
};