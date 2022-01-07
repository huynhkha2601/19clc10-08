import ___routes_accounts_route_js from "../routes/accounts.route.js";
import ___routes_tours_route_js from "../routes/tours.route.js";
import ___routes_locations_route_js from "../routes/locations.route.js";
import ___routes_views_route_js from "../routes/views.route.js";

import toursModel from "../models/tours.model.js";


export default function(app) {


    app.get('/', async (req, res) => {
        let upcomingTours = await toursModel.findTop5UpcomingTours();
        let newestTours = await toursModel.findTop5NewestTours();
        console.log(newestTours)
        let highestPriceTours = await toursModel.findTop5HighestPriceTours();
        res.render('main', {
            upcomingTours, newestTours, highestPriceTours
        });
    });


    app.get('/dashboard', (req, res) => {
        res.render('dashboard',{
            layout: 'dashboard.hbs'
        });
    });

    app.use('/profile', (req, res) => {
        res.render('vwProfiles/profile', {
            layout: 'dashboard.hbs'
        });
    });

    app.use('/changepw', (req, res) => {
        res.render('vwProfiles/changepw', {
            layout: 'dashboard.hbs'
        });
    });



    app.use('/tours', ___routes_tours_route_js);
    app.use('/', ___routes_accounts_route_js);
    app.use('/tours', ___routes_views_route_js);
    app.use('/locations', ___routes_locations_route_js);

    // app.get('/err', function(req,res){
    //     throw new Error('Error!');
    // })

    // app.use(function (req,res, next){
    //     res.render('404', {
    //         layout:false
    //     })
    // });
    //
    // app.use(function (err, req,res, next){
    //     res.render('500', {
    //         layout:false
    //     })
    // });

}
