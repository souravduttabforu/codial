const express = require('express');
const port = 8000;
const app = express();


// Setting routers
app.use('/',require('./routes'));
//Setting view Engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`error in starting the server : ${err}`);
    }
    console.log(`Server is running on : ${port}`);
});