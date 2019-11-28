const express = require('express');
const flight = require('../controller/FlightInfo');

const router = express.Router();

router.get('/arrival', flight.arrival);
router.get('/departure', flight.departure);

module.exports = router;
