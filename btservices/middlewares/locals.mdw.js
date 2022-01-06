
export default function(app){

    app.use(async function (req, res, next){

        if (typeof (req.session.login) == 'undefined'){
            req.session.login = false;
        }

        if (typeof (req.session.account) == 'undefined'){
            req.session.account = null;
        }

        res.locals.loginAuth = req.session.login;
        res.locals.accountAuth = req.session.account;

        next();
    });



    // app.use( async function (req, res, next){
    //     let categories = await categoriesModel.findAll();
    //     for (let category of categories) {
    //         let lst = await typesModel.findTypeByCat(category.cid);
    //         category.list = lst;
    //     }
    //     res.locals.vwCategories = categories;
    //     res.locals.vwCategories[0].isActive = true;
    //     next();
    // });

}