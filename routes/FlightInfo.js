const express = require('express');
const flight = require('../controller/FlightInfo');

const router = express.Router();

router.post('/arrival', flight.arrival);
router.post('/departure', flight.departure);

module.exports = router;
