const mongoose = require('mongoose');
require("dotenv").config();

//  function to connect mongoose database 
 
function dbconnect(){

    mongoose.promise;
    mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    });

    return mongoose.connection
    .once('open', () => console.log('Mongo database Connected'))
    .on('error', (error)=> {
        console.log("Eroor found",error)
    });
}

module.exports=dbconnect;