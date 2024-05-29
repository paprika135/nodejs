const express = require('express');
const path = require('path');
var morgan = require('morgan');
const app = express();
app.set('view engine', 'ejs');


app.use(morgan('dev'));

//配置静态资源文件夹
app.use(express.static(path.join(__dirname,'/public')));

app.get('/', (req, res) => {
    // res.send('<h1>hello weizhu!</h1>');
    // res.sendFile('./views/index.html',{root:__dirname});
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index',{title:'Home',blogs});
});

app.get('/about', (req, res) => {
    res.render('about',{title:'About'});
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create A Blog'});
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use((req, res) => {
    res.status(404);
    res.render('404',{title:'404'});
})




app.listen(3000);