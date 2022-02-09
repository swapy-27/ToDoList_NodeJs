const express = require("express");
const app = express();
const port = 8000;






//using express router to manage diff client requests

app.use('/',require('./routes'));


app.listen(port,function(err){
    if (err){
        console.log('Error in starting Server',err)
    }
    console.log('Server is running on port -->', port);
})