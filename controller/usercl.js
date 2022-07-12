const product = require('../models/product');
const user = require('../models/user');
const {mongooseToobject}  =require('../mongoDB/mongoosetoObject');
const {mutipleMongooseToObject}  =require('../mongoDB/mongoosetoObject');

class Usercontroller {
    index(req, res,next){
        if (!req.session.username){
            return res.render('login', {layout: false, msg: "Đăng Nhập Để Sử Dụng Trang" })
          }
        else{
            if(req.session.role==='admin'){
                res.render('admin')
            }
            else{
                product.find({user:req.session.username})
                    .then(products=>{
                        res.render('index',{products:mutipleMongooseToObject(products)});
                    })
                    .catch(next);
            }
        }
    };
    showdetail(req,res,next){
        if(!req.session.username){
            return res.render('login', {layout: false, msg: "Đăng Nhập Để Sử Dụng Trang" })
        }
        product.findOne({})
            .then(product=>{
                res.render('detail',{product:mongooseToobject(product)})
            })
            .catch(next);
     }
    createnews(req,res,next){
        if (!req.session.username){
            return res.render('login', {layout: false, msg: "Đăng Nhập Để Sử Dụng Trang" })
        }
        res.render('news');
    }
    newproduct(req,res,next){
        const formData=req.body;
        const Product = new product(formData);
        Product.slug=Math.floor((Math.random()*10000000)+1);
        Product.addcart='0';
        Product.user= req.session.username;
        Product.save()
            .then( (err,data) => {res.redirect('/index') } )
            .catch( (err,data) => {res.send( {err: 'Dữ liệu sai '} ) } )
     }
    update(req,res,next){
        product.findById(req.params.id)
            .then(products => res.render('update',{
                products: mongooseToobject(products)
            }))
        .catch(next);
    }
    getupdate(req,res,next){
        product.updateOne({ _id:req.params.id }, req.body)
            .then(()=> res.redirect('/index'))
            .catch(next);
    }
}
module.exports = new Usercontroller;
