const express = require('express');
const { connectToDb, getDb } = require('./db');


const app = express();

//db instance 用于后续我们与数据库沟通
let db;

//在正式监听端口，启动服务之前我们要连接mongoDB数据库
connectToDb((err)=>{
    //如果连接失败，我们就不启动这个服务了。
    if(!err){
        console.log("数据库连接成功");
        app.listen(3000, () => {
            console.log('this server running at 3000 port');
        })
        db = getDb();
        return;
    }
    console.log("数据库连接失败，请重新启动服务！");
});

app.get('/books', (req, res) => {
    const result = [];
    db.collection('books').find().forEach(book => {
        result.push(book);
    }).then(()=>{
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:"无法从数据库中获取到任何数据！"});
    });
})


