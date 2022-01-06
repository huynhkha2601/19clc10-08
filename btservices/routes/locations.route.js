import express from "express";

import locationsModel from "../models/locations.model.js";

const router = express.Router();

router.get('/add', async  function(req, res){
    let locations = await locationsModel.findAllLocations();
    res.render('vwLocations/add', {
        layout: 'dashboard.hbs', locations
    });
});

router.post('/add',async function(req, res){
    let ret = await locationsModel.add(req.body);
   res.redirect('/locations/add');
});

router.get('/edit/', async  function (req, res){
    let location = await locationsModel.findByID(req.query.lid);
    let locations = await locationsModel.findAllLocations();
    res.render('vwLocations/edit', {
        layout: 'dashboard.hbs',
        locations, location
    });
});

router.post('/edit', async function(req, res){
    console.log(req.body);
    let location = await locationsModel.patch(req.body);
    res.redirect('/locations/add');
});

router.get('/del', async function(req, res){
    let location = await locationsModel.del(req.query.lid);
    res.redirect('/locations/add');
});

router.get('/list', async function(req, res){
    let locations = await locationsModel.findAllLocations();
    res.render('vwLocations/list', {
        layout: 'dashboard.hbs', locations
    });
});

export default router;