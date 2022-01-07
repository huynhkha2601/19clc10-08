import ___models_locations_model_js from "../models/locations.model.js";

export default function(app){

    app.use(async function (req, res, next){

        if (typeof (req.session.login) == 'undefined'){
            req.session.login = false;
        }

        if (typeof (req.session.account) == 'undefined'){
            req.session.account = null;
        }

        if (typeof (req.session.cart) == 'undefined'){
            req.session.cart = [];
        }

        if (typeof (req.session.recent) == 'undefined'){
            req.session.recent = [];
        }

        res.locals.loginAuth = req.session.login;
        res.locals.accountAuth = req.session.account;
        res.locals.cartTours = req.session.cart;
        res.locals.recentTours = req.session.recent;

        next();
    });

    app.use( async function (req, res, next){
        let locations = await ___models_locations_model_js.findAllLocations();

        res.locals.locations = locations;
        if(locations.length !== 0)
            res.locals.locations[0].isActive = true;
        next();
    });

}