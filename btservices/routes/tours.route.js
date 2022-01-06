import express from "express";
import multer from "multer";
import toursModel from "../models/tours.model.js";


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
    res.render('vwTours/edit', {
        layout: 'dashboard.hbs',
        tour
    });
});

router.post('/edit', function(req, res){

    res.render('vwTours/edit', {
        layout: 'dashboard.hbs'
    });
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



export default router;