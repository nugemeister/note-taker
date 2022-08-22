// const section
const express = require('express');
const notesRoute = require('./notesRoute.js');
const apiRoutes = express.Router();

// establishing route
apiRoutes.use('/notes', notesRoute);

// export the api routes from the node module
module.exports = apiRoutes;