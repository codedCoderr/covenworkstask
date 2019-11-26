const express = require('express');
const flight = require('../controller/FlightInfo');

const router = express.Router();

router.get('/flightInfo', flight);

module.exports = router;
