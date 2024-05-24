const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    //设置基础地址
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path += '404.html';
            break;
    };

    fs.readFile(path,(err,data)=>{
        if(err){
            console.log("发生了一个错误！");
            res.end();
        }else{
            res.end(data);
        }
    })
    
});



server.listen(3000, 'localhost', () => {
    console.log("this server running at 3000 port!");
})