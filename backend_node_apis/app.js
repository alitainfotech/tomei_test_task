var http = require('http');
var express = require("express");
const helmet = require("helmet");
var cors = require('cors')
var bodyParser = require("body-parser");



const dotenv = require('dotenv');
dotenv.config();

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());


/* route */

var authRouter = require('./routes/auth');
app.use('/auth',authRouter);

/* route end */

const hostname = process.env.NODE_API_URL || 'localhost';
const port = process.env.NODE_API_PORT || '5000';

const httpServer = http.createServer(app);
httpServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});