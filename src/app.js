import * as dotenv from 'dotenv' 
dotenv.config()
import path from "path";
import express, { Router } from 'express';
import {fileURLToPath} from 'url';
import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

import './database/config.js';
import productsRoutes from './routes/product.route.js'
import productViewsRoutes from "./routes/productViews.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles: false,
}));


// Public
app.use(express.static(path.join(__dirname, 'public')));

//  View Engine
app.set( "views", path.join(__dirname, "views" ));
app.set( "view engine", "ejs" );

// Routes
app.use('/api/v1/products', productsRoutes);
app.use('/products', productViewsRoutes);

export default app;