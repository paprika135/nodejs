const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();


//json格式解析
app.use(express.json());

//db instance 用于后续我们与数据库沟通
let db;

//在正式监听端口，启动服务之前我们要连接mongoDB数据库
connectToDb((err) => {
    //如果连接失败，我们就不启动这个服务了。
    if (!err) {
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
    //实现分页查询，获取查询字符串
    const page = req.query.page || 0;
    let booksPerPage = 3;
    const result = [];
    db.collection('books').find().skip(page * booksPerPage).limit(booksPerPage).forEach(book => {
        result.push(book);
    }).then(() => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "无法从数据库中获取到任何数据！" });
    });
});

app.get('/books/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(500).json({error:"传递的id不合法！"})
        return;
    }
    try {
        db.collection('books').findOne({_id:new ObjectId(req.params.id)}).then(doc=>{
            res.status(200).json(doc);
        }).catch(err=>res.status(500).json({error:"找不对应的记录"}));
    } catch (error) {
        res.status(500).json({error:"发生了一个错误，找不到你要查询的数据"})
    }
});

app.post('/books',(req,res)=>{
    const book = req.body;
    db.collection('books').insertOne(book).then(result=>res.status(201).json(result)).catch(error=>res.status(500).json({error:"添加数据失败！"}))
});

app.delete('/books/:id',(req,res)=>{
    //如果传入的id不合法，我们就不去数据库查了
    if(ObjectId.isValid(req.params.id)){
        db.collection('books').deleteOne({_id:new ObjectId(req.params.id)}).then(result=>{
            res.status(200).json(result);
        }).catch(err=>res.status(500).json({error:"找不对应的记录"}));
    }else{
        res.status(500).json({error:"发生了未知错误，无法删除对应记录！"})
    }
});

//patch请求对应updata操作
app.patch('/books/:id',(req,res)=>{
    const updates = req.body;
    if(ObjectId.isValid(req.params.id)){
        db.collection('books').updateOne({_id:new ObjectId(req.params.id)},{$set:updates}).then(result=>{
            res.status(200).json(result);
        }).catch(err=>res.status(500).json({error:"找不对应的记录"}));
    }else{
        res.status(500).json({error:"发生了未知错误，无法更新对应记录！"})
    }
})

