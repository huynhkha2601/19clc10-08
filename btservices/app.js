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

app.get('/bs4', (req, res) =>{
    res.sendFile(__dirname + "/bs4.html");
});

app.use(morgan('dev'));
const port = 5000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});