import ___routes_accounts_route_js from "../routes/accounts.route.js";
import ___routes_tours_route_js from "../routes/tours.route.js";
import express from "express";
import morgan from "morgan";

export default function(app) {


    app.get('/', (req, res) => {
        res.render('main');
    });


    app.get('/dashboard', (req, res) => {
        res.render('dashboard',{
            layout: 'dashboard.hbs'
        });
    });


    app.use('/tours', ___routes_tours_route_js);
    app.use('/', ___routes_accounts_route_js);




    app.get('/err', function(req,res){
        throw new Error('Error!');
    })

    app.use(function (req,res, next){
        res.render('404', {
            layout:false
        })
    });

    app.use(function (err, req,res, next){
        res.render('500', {
            layout:false
        })
    });

}