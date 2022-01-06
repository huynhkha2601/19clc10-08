import ___routes_accounts_route_js from "../routes/accounts.route.js";
import ___routes_tours_route_js from "../routes/tours.route.js";
import ___routes_locations_route_js from "../routes/locations.route.js";

import toursModel from "../models/tours.model.js";


export default function(app) {


    app.get('/', async (req, res) => {
        let upcomingTours = await toursModel.findTop5UpcomingTours();
        let newestTours = await toursModel.findTop5NewestTours();
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

    app.use('/newest', async (req, res) => {
        let tours = await toursModel.findAll();
        res.render('vwView/newest', {
            layout: 'viewlist.hbs', tours
        });
    });


    app.use('/tours', ___routes_tours_route_js);
    app.use('/', ___routes_accounts_route_js);
    app.use('/locations', ___routes_locations_route_js);

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
//
//
// function getListPage(curPage, pageNum) {
//
//     let listPages = [];
//     let i = curPage - 2;
//     let endPage = curPage + 2;
//     if (i <= 0) {
//         i = 1;
//         endPage += 2;
//     } else if (i >= 3) {
//         listPages.push({
//             value: 1, isCur: false
//         });
//         listPages.push({
//             value: "...", isCur: false
//         })
//     } else if (i == 2) {
//         listPages.push({
//             value: 1, isCur: false
//         });
//     }
//     for (i; i < endPage + 1; i++) {
//         if (i > pageNum)
//             break;
//         listPages.push({
//             value: i, isCur: i === curPage
//         })
//     }
//     if (i === pageNum) {
//         listPages.push({
//             value: i, isCur: false
//         });
//     }
//     if (i <= pageNum - 1) {
//         listPages.push({
//             value: "...", isCur: false
//         });
//         listPages.push({
//             value: pageNum, isCur: false
//         });
//     }
//     return listPages;
// }
//
//
// function getListSearchPage(curPage, pageNum,key) {
//
//     let listPages = [];
//     let i = curPage - 2;
//     let endPage = curPage + 2;
//     if (i <= 0) {
//         i = 1;
//         endPage += 2;
//     } else if (i >= 3) {
//         listPages.push({
//             value: 1, isCur: false, url: '/search/' + i + '?' + key
//         });
//         listPages.push({
//             value: "...", isCur: false, url: '/search/' + i + '?' + key
//         })
//     } else if (i == 2) {
//         listPages.push({
//             value: 1, isCur: false, url: '/search/' + i + '?' + key
//         });
//     }
//     for (i; i < endPage + 1; i++) {
//         if (i > pageNum)
//             break;
//         listPages.push({
//             value: i, isCur: i === curPage, url: '/search/' + i + '?' + key
//         })
//     }
//     if (i === pageNum) {
//         listPages.push({
//             value: i, isCur: false, url: '/search/' + i + '?' + key
//         });
//     }
//     if (i <= pageNum - 1) {
//         listPages.push({
//             value: "...", isCur: false, url: '/search/' + i + '?' + key
//         });
//         listPages.push({
//             value: pageNum, isCur: false, url: '/search/' + i + '?' + key
//         });
//     }
//     return listPages;
// }
