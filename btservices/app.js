import express from 'express';
import { engine } from 'express-handlebars';


import {dirname} from 'path';
import {fileURLToPath} from 'url';
import mysql from 'mysql';


const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();

app.engine('.hbs', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/bs4', (req, res) =>{
    res.sendFile(__dirname + "/bs4.html");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});