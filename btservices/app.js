import express from 'express';
import { engine } from 'express-handlebars';
import morgan from 'morgan';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
import mysql from 'mysql';


const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
app.engine('hbs', engine({
    defaultLayout:'home.hbs',
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/login', (req, res) => {
    res.render('./vwAccounts/login',{layout : 'accounts.hbs'}) ;
});

app.get('/details', (req, res) => {
    res.render('./vwProducts/index',{layout : 'home.hbs'}) ;
});

app.use('/public', express.static('public'));
app.use(morgan('dev'));
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});