import express from 'express';
import http from 'http';
import config from './config/environment';

var app = express();
var server = http.createServer(app);

require('./routes').default(app);

// Start server function
function startServer() {
    app.nodeServer = server.listen(config.port, config.ip, () => {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

// Expose app
exports = module.exports = app;
