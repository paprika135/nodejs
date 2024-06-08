const mongoose = require('mongoose');
const { Blog } = require('./model/book');
mongoose.connect("mongodb://127.0.0.1:27017/bookstore");

async function save() {
    const user = new Blog({
        title: "天下郡国利病书",
        author: "顾炎武",
        rating: 8,
        pages: 1000,
        genres: [
          "游历",
          "地理",
          "人文",
          "明代社会经济状况"
        ],
        reviews: [
          {
            name: "李俊奇",
            body: "想读，但是没时间"
          }
        ]
      });
      await user.save();
      console.log(user);
};

save();