import {engine} from "express-handlebars";
import sections from "express-handlebars-sections";


export default function (app) {

    app.engine('hbs', engine({
        defaultLayout: 'home.hbs',
        helpers: {
            section: sections(),
            formatMoney(val) {
                return val.toLocaleString('vi', {
                    style: 'currency', currency: 'VND'
                });
            },
            formatDateTime(d) {
                if (d === null)
                    return "";
                return d.toLocaleString('vi');
            },
            equal(varr, val){
                console.log(varr, val, typeof varr, typeof val,varr === val)
                return parseInt(varr) === parseInt(val);
            },
            diff(varr, val){
                return varr !== val;
            },
            splitName(val){
                if (val === null)
                    return "user";
                let s = val.split(' ');
                return s[s.length-1];
            }
        }
    }));

    app.set('view engine', 'hbs');
    app.set('views', './views');

}