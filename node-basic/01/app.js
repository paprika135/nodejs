const express = require('express');
const path = require('path');
var morgan = require('morgan');
const app = express();
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/blogs";//本地mongodb地址
const { Blog } = require('./model/blog');//blog模型，用于向数据库中添加数据


//连接数据库
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user:"weizhu",
    pass:"ffff0808..+"
});
const db = mongoose.connection;


db.on('error', () => {
    console.log("数据库连接失败");
})
db.once('open', () => {
    console.log("数据库连接成功！");
    app.listen(3000);
})



app.use(morgan('dev'));

//配置静态资源文件夹
app.use(express.static(path.join(__dirname, '/public')));

app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title:'日记',
        snippet:"about weizhu's new blog.",
        body:"我的内心无比强大！"
    });
    blog.save().then((result)=>{
        res.send(result)
    }).catch(err=>console.log(err))
});

app.get("/get-all-blogs",(req,res)=>{
    Blog.find().then((result)=>{
        res.send(result);
    }).catch(err=>console.log(err))
});

ap

app.get('/', (req, res) => {
    // res.send('<h1>hello weizhu!</h1>');
    // res.sendFile('./views/index.html',{root:__dirname});
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create A Blog' });
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use((req, res) => {
    res.status(404);
    res.render('404', { title: '404' });
})




