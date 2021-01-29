const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require('helmet');
require('dotenv').config();

// Import endpoints
const postmortems = require('./endpoints/postmortems');

const app = express();

var corsOptions = {
    origin: '*'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if ("OPTIONS" == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Init database
const { db, dbURI } = require('./db/connection');

console.log("[INFO] Connecting to the Database...");
db.once('open', ()=> {
    console.log("[INFO] Database connected to " + dbURI);

    app.listen(process.env.APP_PORT, () => {
        console.log("[INFO] Starting Morty Service, listening on port " + process.env.APP_PORT);
    });
});
db.on('error', console.error.bind(console, 'Connection error'));

// Main endpoint
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Morty API" });
});

// Postmortems endpoint
app.use('/postmortems', postmortems);
