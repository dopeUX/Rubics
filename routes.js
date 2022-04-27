const routes = require('next-routes')();

 routes
 .add('/seller/:address/','/seller/createProduct/')
 
module.exports = routes;