const mongoose = require('mongoose');
// const { Blog } = require('./model/book');
const { Users } = require("./model/user");
mongoose.connect("mongodb://127.0.0.1:27017/bookstore");

// async function save() {
//     const user = new Blog({
//         title: "天下郡国利病书",
//         author: "顾炎武",
//         rating: 8,
//         pages: 1000,
//         genres: [
//           "游历",
//           "地理",
//           "人文",
//           "明代社会经济状况"
//         ],
//         reviews: [
//           {
//             name: "李俊奇",
//             body: "想读，但是没时间"
//           }
//         ]
//       });
//       await user.save();
//       console.log(user);
// };

//测试populate的用途。
async function save(){
  // const user = new Users({
  //   name:"未烛",
  //   age:25,
  //   email:"weizhu@qq.com",
  //   hobbles:["阅读","跑步"],
  //   bestFriend:"6667e7626cb59ac02a8ff61c"
  // });

  // await user.save();
  // console.log(user);
  // const user = await Users.where("age").gt(24).populate('bestFriend');
  // console.log(user);

  const user = new Users({name:"刘俊伟",age:25,email:"liujunwei@qq.com",hobbles:["打游戏","偶尔看看黄片","emo"]});
  // const user = await Users.sayHi("李俊奇");
  // console.log(user);
  await user.save();
  console.log(user.VirtualAge);
}

save();