const product = require('../models/product');
const {mongooseToobject}  =require('../mongoDB/mongoosetoObject');
const {mutipleMongooseToObject}  =require('../mongoDB/mongoosetoObject');

class NewsController {
    // [Get => news]
    index(req, res,next){
        if (!req.session.username){
            return res.render('login',{layout: false})
          }
        else{
            if(req.session.role==='user'){
                return res.render('index')
            }  
            else{
                product.find()
                    .then(products=>{
                        res.render('admin',{products:mutipleMongooseToObject(products)});
                    })
                    .catch(next);
            }};
            }
     //post
    newproduct(req,res,next){
        const formData=req.body;
        const Product = new product(formData);
        Product.slug=Math.floor((Math.random()*10000000)+1);
        Product.addcart='0';
        Product.user= req.session.username;
        Product.save()
            .then( (err,data) => {res.redirect('back') } )
            .catch( (err,data) => {res.send( {err: 'Dữ liệu sai '} ) } )
     }
    delete(req,res,next){   
        product.deleteOne({_id:req.params.id})
        .then(()=>res.redirect('back'))
        .catch(next);
    }
}
module.exports = new NewsController;
