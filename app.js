const koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

// 实例化koa
const app = new koa();
const router = new Router();

app.use(bodyParser());

// 引入 users.js
const users = require('./routes/api/user');

// 路由
router.get('/', async ctx => {
    ctx.body = { msg: "Hello Koa Interfaces" };
});

// config
const db = require('./config/keys').mongoURL;

app.use(passport.initialize());
app.use(passport.session());

// 回调到config文件中 passport.js
require('./config/passport')(passport);

// 配置路由地址  localhost:5000/api/users
router.use("/api/users", users);

// 连接数据库
mongoose.connect(db, { useUnifiedTopology: true })
    .then(() => {
        console.log('Mongodb Connected...');
    })
    .catch((err) => {
        console.log('err');
    })


// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on ${port}`);
})