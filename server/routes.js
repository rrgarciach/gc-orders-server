const path = require('path');
// let cors = require('cors');

module.exports = function(app) {
    // app.use(cors());
    app.use('/', function (req, res) { res.json({message:'ok'})});
    app.use('/api/v1/orders', function () {});
};
