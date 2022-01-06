import express from 'express';
import {engine} from "express-handlebars";
import sections from "express-handlebars-sections";

import {dirname} from 'path';
import {fileURLToPath} from 'url';


import active_middleware_route from "./middlewares/routes.mdw.js";
import active_middleware_locals from "./middlewares/locals.mdw.js";
import active_middleware_sessions from "./middlewares/sessions.mdw.js";
import active_middleware_view from "./middlewares/view.mdw.js";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
app.use('/public', express.static('public'));
app.use(express.urlencoded({
    extended:true
}));
app.use(morgan('dev'));


active_middleware_sessions(app);
active_middleware_view(app);
active_middleware_locals(app);
active_middleware_route(app);


let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});