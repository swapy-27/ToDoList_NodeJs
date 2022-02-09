const express = require("express");
const app = express();
const port = 8001;
const expressLayouts = require('express-ejs-layouts');


//allowing our app to use static files from assets forlder gobally
app.use(express.static('./assets'));


//setting up embeddedjavascript
app.set('view engine', 'ejs');
app.set('views', './views');

//using layouts and partials 
app.use(expressLayouts);
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

//using express router to manage diff client requests
app.use('/',require('./routes'));


app.listen(port,function(err){
    if (err){
        console.log('Error in starting Server',err)
    }
    console.log('Server is running on port -->', port);
})