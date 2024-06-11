const express = require('express');
const path = require('path');
var morgan = require('morgan');
const app = express();
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/NodeTuts";//本地mongodb地址
const { Blog } = require('./model/blog');

const testData = new Blog({
    title:"史记",
    author:"司马迁"
});

testData.save().then(res=>{
    console.log(res);
});

Blog.findOne({title:"史记"}).then(res=>console.log(res));

//连接数据库
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "blogs", user: "weizhu", pass: "ffff0808..+" });
const db = mongoose.connection;
db.on('error', () => {
    console.log("数据库连接失败");
})
db.once('open', () => {
    console.log("数据库连接成功！")
})



app.use(morgan('dev'));

//配置静态资源文件夹
app.use(express.static(path.join(__dirname, '/public')));

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




app.listen(3000);