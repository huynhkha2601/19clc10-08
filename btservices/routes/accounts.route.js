import express from "express";
import bcrypt from "bcryptjs";

import accountsModel from "../models/accounts.model.js";


const router = express.Router();

router.get('/login', function(req, res){
    res.render('vwAccounts/login', {
        layout: 'accounts.hbs'
    });
});

router.post('/login', async function(req, res){
    let account = req.body;
    let user = await accountsModel.findByUsername(account.username);
    let flag = bcrypt.compareSync(account.password, user.password); // true
    console.log(flag);
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

        let salt = bcrypt.genSaltSync(req.body.password.length);
        account.password = bcrypt.hashSync(account.password, salt);
        delete account.repeat;
        let ret = await accountsModel.add(account);

        res.render('vwAccounts/register', {
            layout: 'accounts.hbs',
            notification_message: "Register successfully!",
            notification: true, check: true
        });

    }else if (!await accountsModel.checkAccount(req.body.username)){
        res.render('vwAccounts/register', {
            layout: 'accounts.hbs',
            err_message: "Username has been registered!",
            err: true, check:true
        });
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

export default router;