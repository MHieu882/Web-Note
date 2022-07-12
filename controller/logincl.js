const User = require('../models/user');

class logincontroller{
    index(req, res) {
        res.render('login', {layout: false })
    }
    async login(req,res,next){
        let login = await User.findOne({ username: req.body.username });
        const formData=req.body;
        if (!login) {
            return res.render('login',{layout: false,msg: 'Tài Khoản Không Tồn Tại!!'})
        }else{
            if(formData.password === login.password){
                req.session.username = login.username;
                req.session.role = login.role;
                if(req.session.role==='admin'){
                    res.redirect('/admin')
                }
                else if(req.session.role==='user'){
                    return res.redirect('/index')
                }
            }else{
                return res.render('login',{layout: false,msg: 'Mật Khẩu Không Hợp Lệ !!'})
            }
        }
    }
    async register(req,res,next){
        let username = await User.findOne({ username: req.body.username });
        const formData=req.body;
        if(!username){
            const newuser = new User(formData);
            newuser.CreateAt=Date.now();
            newuser.role='user';
            newuser.save()
            return res.render('login',{layout: false,msg: 'Đăng kí thành công !!'}) 
        }
        else{
            res.render('login',{layout: false,msg:'username đã tồn tại'});
        }
    }
    Changepassword(req,res,next){
        return res.render('ChangePass')
    }
    async Changepass(req,res,next){
        let UserChange = await User.findOne({ username: req.session.username});
        if (!UserChange) {
            return res.render('ChangePass', { msg: "Không tìm thấy Tài Khoản" })
        } else {
            if (UserChange.password === req.body.oldpassword) {
                if (req.body.newpassword1 === req.body.newpassword2) {
                    User.updateOne({ username: req.session.username },{ password: req.body.newpassword1})
                    .then(()=>res.render('login',{msg:' Đổi Mật Khẩu Thành Công'}))
                    .catch(next);
                } else {
                    return res.render('ChangePass', { msg: "Mật Khẩu Nhập Lại không Khớp" })}} 
                else {
            return res.render('ChangePass', { msg: "Mật Khẩu Cũ Không Khớp" })
            }
        }
    }
    logout(req,res,next){
        req.session.destroy();
        return res.render('login',{layout: false });
    } 
}
module.exports = new logincontroller;