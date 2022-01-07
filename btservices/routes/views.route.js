import express from "express";

import toursModel from "../models/tours.model.js";
import {getListPage, getListSearchPage} from "../utils/getListPage.js";

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
    let listPages = getListPage(curPage, pageNum);
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
    let listPages = getListPage(curPage, pageNum);
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
    let listPages = getListPage(curPage, pageNum);
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

    let quantity = await toursModel.findQuantityByLocations(req.params.id);
    let pageNum = Math.floor(quantity / limit);
    if (quantity % limit > 0)
        pageNum++;
    let listPages = getListPage(curPage, pageNum);
    let tours = await toursModel.findToursByLocationWithOffset(req.params.id,(curPage - 1) * limit);

    let url = req.url.split("?")[0];
    // console.log(url);
    res.render('vwView/byLoc', {
        layout: 'viewlist.hbs', tours
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
    let listPages = getListPage(curPage, pageNum, req.query.key);
    let tours = await toursModel.findToursWithKeyWithOffset(req.query.key,(curPage - 1) * limit);

    res.render('vwView/bySearch', {
        layout: 'viewlist.hbs'
    });
});


export default router;