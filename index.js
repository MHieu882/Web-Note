const express = require('express');
// const morgan=require('morgan');
const path=require('path');
const { engine } = require("express-handlebars");
const cookieParser = require('cookie-parser');
const port=3000;
const app = express();
const bodyParser = require('body-parser')
const methodOverride= require('method-override');// change get to put at form html
const multer= require('multer')


app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
//template engine
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'views'));
var secret = require('./secrect')

//http logger
// app.use(morgan('combined'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(require('cookie-parser')(secret.cookieSecret));
app.use(require("express-session")(secret.sessionSecret));


//mongo connect
var mongoConnect = require('./mongoDB/mongoconnect.js');
mongoConnect.connectDB();
const routes = require('./routes');
// multer

var storage = multer.diskStorage({
  destination: function(req,file,cb){
    if(file.mimetype==="image/jpg" ||
      file.mimetype ==="image/png" ||
      file.mimetype==="image/jpeg"){
        cb(null,'img');
      }else{
        cb(new Error('not image'),false);
      }
  },
  filename:function(req,file,cb){
    cb(null,file.originalname);
    cb(null,date.now() +'jpg');
  }
});
var upload = multer({storage:storage})
//Route init       
routes(app);       

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})