const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


app.use(express.urlencoded());
app.use(cookieParser());
//setting up layouts
app.use(expressLayouts);

//Extract style and script from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// Setting routers
app.use('/',require('./routes'));

//Setting view Engine
app.set('view engine','ejs');
app.set('views','./views');

//Setting static file
app.use(express.static('./assets'));


app.listen(port,function(err){
    if(err){
        console.log(`error in starting the server : ${err}`);
    }
    console.log(`Server is running on : ${port}`);
});