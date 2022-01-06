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
                return d.toLocaleString('vi');
            },
            equals(variable, statements, value) {
                if (statements === '=') {
                    return (variable === value);
                }
                if (statements === '!=')
                    return (variable !== value);
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