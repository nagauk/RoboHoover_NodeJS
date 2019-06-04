const express = require('express');
const bodyParser = require('body-parser');
const polygonGeo = require('point-in-geopolygon');



// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect(dbConfig.url,{
    useNewUrlParser : true,
}).then(() => {
    console.log("Successfully connected to the database.")
}).catch(err => {
    console.log("Coudn't connect to the database...",err)
    process.exit;
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to RoboHoover application."});
});

require('./app/routes/roboHoover.routes.js')(app);
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});