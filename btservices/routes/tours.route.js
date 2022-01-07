import express from "express";
import multer from "multer";
import toursModel from "../models/tours.model.js";
import locationsModel from "../models/locations.model.js";


const dir = './public/image/tours/';
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, dir);
    },
    filename: async (req, file, cb) => {
        let sl = await toursModel.findNextTourID();
        cb(null, sl + '.jpg');
    }
});
const upload = multer({storage});


router.get('/add', async  function(req, res){
    res.render('vwTours/add', {
        layout: 'dashboard.hbs'
    });
});

router.post('/add',upload.single('file'),async function(req, res){
    let ret = await toursModel.add(req.body);

    res.render('vwTours/add', {
        layout: 'dashboard.hbs'
    });
});

router.get('/edit/', async  function (req, res){
    let tour = await toursModel.findByID(req.query.tourid);
    let isCur = tour.location;
    let locations = await locationsModel.findAllLocations();
    for (let location of locations) {
        if (location.lid === isCur)
            location.isCur = true;
        else
            location.isCur = false;
    }
    res.render('vwTours/edit', {
        layout: 'dashboard.hbs',
        tour, locations
    });

});

router.post('/edit',async function(req, res){

    const storageEdit = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, dir);
        },
        filename: async (req, file, cb) => {
            cb(null, req.query.tourid + '.jpg');
        }
    });

    const uploadEdit = multer({storage: storageEdit});
    uploadEdit.single('file')(req, res, async function (err) {
        let id = req.body.tourid;

        if (req.body.datestart === '')
            delete req.body.datestart;
        if (req.body.dateend === '')
            delete req.body.dateend;

        let tour = await toursModel.patch(req.body);

        res.redirect('/tours/edit?tourid='+ id);
    })
});

router.get('/del', function(req, res){
    res.redirect('/tours/del');
});

router.get('/list', async function(req, res){
    let tours = await toursModel.findAll();
    res.render('vwTours/list-tours', {
        tours,
        layout: 'dashboard.hbs'
    });
});

router.get('/detail/:tid',async function(req, res){

    let tour = await toursModel.findByID(req.params.tid);
    req.session.recent.push(tour);

    res.render('vwTours/detail', {
        layout: 'tours.hbs', tour
    });
});


router.get('/book/:tid',async function(req, res){

    let tour = await toursModel.findByID(req.params.tid);
    req.session.cart.push(tour);

    res.render('vwTours/detail', {
        layout: 'tours.hbs', tour
    });
});


export default router;