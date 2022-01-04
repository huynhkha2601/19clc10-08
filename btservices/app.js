import express from 'express';
import {engine} from "express-handlebars";
import sections from "express-handlebars-sections";
import morgan from 'morgan';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
app.use('/public', express.static('public'));
app.use(express.urlencoded({
    extended:true
}));

app.engine('hbs', engine({
    defaultLayout:'home.hbs',
}));

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
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/login', (req, res) => {
    res.render('./vwAccounts/login',{layout : 'accounts.hbs'}) ;
});

app.get('/register', (req, res) => {
    res.render('./vwAccounts/register',{layout : 'accounts.hbs'}) ;
});

app.get('/forget', (req, res) => {
    res.render('./vwAccounts/forgetpw',{layout : 'accounts.hbs'}) ;
});

app.get('/Product', (req, res) => {
    res.render('./vwProducts/index',{layout : 'home.hbs'}) ;
});

app.get('/Product/detail', (req, res) => {
    res.render('./vwProducts/details',{layout : 'home.hbs'}) ;
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});