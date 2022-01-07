import express from "express";

import toursModel from "../models/tours.model.js";
import listPage from "../utils/getListPage.js";

const router = express.Router();
const limit = 15;

router.get('/newest', async (req, res) => {

    let curPage = req.query.page || 1;

    if (curPage <= 0) {
        res.redirect('/newest');
        return;
    }

    let quantity = await toursModel.findQuantity();
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;
    let listPages = listPage.getListPage(curPage, pageNum);
    let tours = await toursModel.findNewestToursWithOffset((curPage - 1) * limit);

    res.render('vwView/newest', {
        layout: 'viewlist.hbs', tours, listPages
    });
});

router.get('/highestprice', async (req, res) => {

    let curPage = req.query.page || 1;

    if (curPage <= 0) {
        res.redirect('/highestprice');
        return;
    }
    let quantity = await toursModel.findQuantity();
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;
    let listPages = listPage.getListPage(curPage, pageNum);
    let tours = await toursModel.findHighestPriceToursWithOffset((curPage - 1) * limit);
    console.log(listPages);
    res.render('vwView/highestprice', {
        layout: 'viewlist.hbs', tours, listPages
    });
});

router.get('/upcoming', async (req, res) => {

    let curPage = req.query.page || 1;

    if (curPage <= 0) {
        res.redirect('/upcoming');
        return;
    }

    let quantity = await toursModel.findQuantity();
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;
    let listPages = listPage.getListPage(curPage, pageNum);
    let tours = await toursModel.findUpcomingToursWithOffset((curPage - 1) * limit);

    res.render('vwView/upcoming', {
        layout: 'viewlist.hbs', tours, listPages
    });
});

router.get('/byLoc/:id', async (req, res) => {
    let curPage = req.query.page || 1;

    if (curPage <= 0) {
        res.redirect('/upcoming/byLoc/' + req.params.id);
        return;
    }

    for (const location of res.locals.locations) {
           location.isActive = (location.lid === parseInt(req.params.id));
    }

    let quantity = await toursModel.findQuantityByLocations(req.params.id);
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;
    let listPages = listPage.getListSearchByLocPage(curPage, pageNum,req.params.id);

    console.log(listPages)
    let tours = await toursModel.findToursByLocationWithOffset(req.params.id,(curPage - 1) * limit);

    let url = req.url.split("?")[0];
    console.log(url);
    res.render('vwView/byLoc', {
        layout: 'viewlist.hbs', tours, url ,listPages
    });
});


router.get('/bySearch/:page', async (req, res) => {

    let curPage = req.params.page || 1;
    if (curPage <= 0) {
        res.redirect('/');
        return;
    }

    let quantity = await toursModel.findQuantityWithKey(req.query.key);
    // console.log(productNum);
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;
    let listPages = listPage.getListPage(curPage, pageNum, req.query.key);
    let tours = await toursModel.findToursWithKeyWithOffset(req.query.key,(curPage - 1) * limit);
    let url = req.url.split("?")[0];

    res.render('vwView/bySearch', {
        layout: 'viewlist.hbs', tours, url,listPages
    });
});



router.get('/bySearch/byTourname/:page', async (req, res) => {

    let curPage = req.params.page || 1;
    if (curPage <= 0) {
        res.redirect('/');
        return;
    }

    let quantity = await toursModel.findQuantityByName(req.query.key);
    // console.log(productNum);
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;
    let listPages = listPage.getListSearchByNamePage(curPage, pageNum, req.query.key);
    console.log(listPages);
    let tours = await toursModel.findToursByNameWithOffset(req.query.key,(curPage - 1) * limit);
    let url = req.url.split("?")[0];
    res.render('vwView/bySearch', {
        layout: 'viewlist.hbs', tours,url, listPages
    });
});

router.get('/bySearch/byPrice/:page', async (req, res) => {

    let curPage = req.params.page || 1;
    if (curPage <= 0) {
        res.redirect('/');
        return;
    }

    let quantity = await toursModel.findQuantityByPrice(req.query.key);
    // console.log(productNum);
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;
    let listPages = listPage.getListSearchByPricePage(curPage, pageNum, req.query.key);
    let tours = await toursModel.findToursByPriceWithOffset(req.query.key,(curPage - 1) * limit);
    console.log(listPages);

    let url = req.url.split("?")[0];
    res.render('vwView/bySearch', {
        layout: 'viewlist.hbs', tours,url, listPages
    });
});

router.get('/bySearch/byDate/:page', async (req, res) => {

    let curPage = req.params.page || 1;
    if (curPage <= 0) {
        res.redirect('/');
        return;
    }

    let quantity = await toursModel.findQuantityByDate(req.query.key);
    // console.log(productNum);
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;
    let listPages = listPage.getListSearchByDatePage(curPage, pageNum, req.query.key);
    let tours = await toursModel.findToursByDateWithOffset(req.query.key,(curPage - 1) * limit);
    let url = req.url.split("?")[0];
    console.log(listPages);

    res.render('vwView/bySearch', {
        layout: 'viewlist.hbs', tours,url, listPages
    });
});

router.post('/search', async (req, res) => {
    let key = req.body;
    let checkTourName = (key.tourname === '');
    let checkPrice = key.price === '';
    let checkLocation = (key.location === '' || key.location === undefined);
    let checkDate = key.datestart === '';
    console.log(key, checkPrice, checkTourName, checkLocation, checkDate)
    if(checkTourName && checkPrice && checkDate && checkLocation){
        res.redirect('/');
    }else if(checkTourName && checkPrice && checkDate){
        res.redirect('/tours/byLoc/' + key.location);
    }else if(checkLocation && checkPrice && checkDate){
        res.redirect('/tours/bySearch/byTourname/1?key=' + key.tourname);
    }else if(checkLocation && checkTourName && checkDate){
        res.redirect('/tours/bySearch/byPrice/1?key=' + key.price);
    }else if(checkLocation && checkTourName && checkPrice){
        res.redirect('/tours/bySearch/byDate/1?key=' + key.datestart);
    }else {
        res.redirect('/tours/newest');
    }

    // res.redirect('/tours/bySearch/byTourname/1?key=a');
});



export default router;