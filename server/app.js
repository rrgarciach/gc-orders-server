'use strict';

import express from 'express';
import http from 'http';
import config from './config/environment';

var app = express();
var server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);

// Start server function
function startServer() {
    app.nodeServer = server.listen(config.PORT, config.IP, () => {
        console.log('Express server listening on %d, in %s mode', config.PORT, app.get('env'));
    });
}

startServer();
require('./sqldb/migrate').up()
    .then(() => {
        console.log('Sequelize migrations successfully executed.');
    })
    .catch(err => {
        console.log('Server failed to start due to error: %s', err);
    });

// Expose app
module.exports = app;
