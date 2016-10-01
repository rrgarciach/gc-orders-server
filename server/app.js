'use strict';

let express = require('express');
let http = require('http');
const CONFIG = require('./config/environment');

var app = express();
var server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);

// Start server function
function startServer() {
    app.nodeServer = server.listen(CONFIG.PORT, CONFIG.IP, () => {
        console.log('Express server listening on %d, in %s mode', CONFIG.PORT, app.get('env'));
    });
}

startServer();

// Expose app
exports = module.exports = app;
