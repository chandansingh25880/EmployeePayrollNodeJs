const express = require('express');
const dbconnect = require('./config/database.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
require("dotenv").config();
// create express app
const app = express();

//Connect to DB
dbconnect();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(express.json())     

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EmployeePayRoll application "});
});

// Require Notes routes
require('./app/routers/employee')(app);

//swagger requests to app
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// listen for requests
 module.exports = 
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is listening on the port "+process.env.SERVER_PORT);

});