import ___routes_accounts_route_js from "../routes/accounts.route.js";

export default function(app) {

    app.get('/', async function (req, res) {
        res.render('home');
    });

    app.use('/accounts', ___routes_accounts_route_js);

}