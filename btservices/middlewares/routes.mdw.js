import ___routes_accounts_route_js from "../routes/accounts.route.js";
import ___routes_tours_route_js from "../routes/tours.route.js";

export default function(app) {

    app.get('/', (req, res) => {
        res.render('main');
    });


    app.get('/dashboard', (req, res) => {
        res.render('main',{
            layout: 'dashboard.css'
        });
    });

    app.use('/tours', ___routes_tours_route_js);
    app.use('/accounts', ___routes_accounts_route_js);

}