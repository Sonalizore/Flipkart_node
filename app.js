var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

global.data=[{name:"Sonali"}]  // Global veriable usefull in any file of this application 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var masterRouter = require('./routes/master.route');
var menuRouter =require('./routes/menu.reoute');
var categoryRouter=require('./routes/category.route');
var subcatRouter=require('./routes/subcat.route');
var productRouter=require('./routes/product.route');
var colorRouter=require('./routes/color.router');
var sizeRouter=require('./routes/size.route');
// var reviewRouter=require('./routes/reviews.route');

const db=require('./model');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
db.sequelize.sync({});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/master', masterRouter);
app.use('/menu',menuRouter);
app.use('/category',categoryRouter);
app.use('/subcat',subcatRouter);
app.use('/product',productRouter);
app.use('/color',colorRouter);
app.use('/size',sizeRouter);
// app.use('/reveiws',reviewRouter);

module.exports = app;
