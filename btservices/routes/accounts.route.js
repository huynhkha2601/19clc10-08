import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";

import accountsModel from "../models/accounts.model.js";
import toursModel from "../models/tours.model.js";


const dir = './public/image/accounts/';

const router = express.Router();

router.get('/login', function(req, res){
    res.render('vwAccounts/login', {
        layout: 'accounts.hbs'
    });
});

router.post('/login', async function(req, res){
    let user = await accountsModel.findByUsername(req.body.username);
    console.log(req.body, user);
    if(user === null){
        res.redirect('/login');
        return;
    }

    let flag = bcrypt.compareSync(req.body.password, user.password);
    if(flag){
        // session login.
        req.session.login = true;
        req.session.account = user;

        res.redirect('/');
        return;
    }

    res.render('vwAccounts/login', {
        layout: 'accounts.hbs'
    });
});

router.get('/register', function(req, res){
    res.render('vwAccounts/register', {
        layout: 'accounts.hbs', check:false
    });
});

router.post('/register', async function(req, res){
    let account = req.body;
    if(account.password === account.repeat){
        if (!await accountsModel.checkAccount(req.body.username)){
            let salt = bcrypt.genSaltSync(10);
            account.password = bcrypt.hashSync(account.password, salt);
            delete account.repeat;
            let ret = await accountsModel.add(account);

            res.render('vwAccounts/register', {
                layout: 'accounts.hbs',
                notification_message: "Register successfully!",
                notification: true, check: true
            });
        }else{

            res.render('vwAccounts/register', {
                layout: 'accounts.hbs',
                err_message: "Username has been registered!",
                err: true, check:true
            });
        }
    }
    else {
        let err_message = "Password and repeat password does not match";
        res.render('vwAccounts/register', {
            layout: 'accounts.hbs',
            err_message, err: true, check:true
        });
    }

});

router.get('/forget', function(req, res){
    res.render('vwAccounts/forgetpw', {
        layout: 'accounts.hbs'
    });
});

router.post('/forget',async function(req, res){

    let account = req.body;
    if(account.password === account.confirm){

        let user = await accountsModel.findByUsername(account.username);
        account.userid = user.userid;

        let salt = bcrypt.genSaltSync(req.body.password.length);
        account.password = bcrypt.hashSync(account.password, salt);

        delete account.confirm;
        let ret = await accountsModel.patch(account);

    }

    res.render('vwAccounts/forgetpw', {
        layout: 'accounts.hbs'
    });

});

router.get('/logout', function(req, res){
    req.session.login = false;
    req.session.account = null;
    req.session.cart = [];
    req.session.recent = [];
    res.redirect("/");
})

router.get('/accounts/profile/:uid',async function(req, res){
    res.render('vwProfiles/profile', {
        layout: 'dashboard.hbs'
    });
})

router.post('/accounts/profile', function(req, res){

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, dir);
        },
        filename: async (req, file, cb) => {
            cb(null, req.session.account.userid + '.jpg');
        }
    });

    const upload = multer({storage});

    upload.single('avatar')(req, res, async function (err) {
        let id = req.body.userid;

        if (req.body.dob === '')
            delete req.body.dob;

        console.log(req.body);
        res.redirect('/accounts/profile');
    })

})

router.get('/accounts/changepw', function(req, res){
    res.render('vwProfiles/changepw', {
        layout: 'dashboard.hbs'
    });
})

router.post('/accounts/changepw', async function(req, res){

    let account = req.body;
    if(account.password === account.confirm){

        let user = await accountsModel.findByID(account.userid);
        account.userid = user.userid;

        let salt = bcrypt.genSaltSync(req.body.password.length);
        account.password = bcrypt.hashSync(account.password, salt);



        delete account.oldpassword;
        delete account.confirm;
        let ret = await accountsModel.patch(account);

    }else {
        res.render('vwProfiles/changepw', {
            layout: 'dashboard.hbs', err: "Confirm does not match to Password!"
        });
    }

})

export default router;