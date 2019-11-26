const express = require('express');
const auth = require('./Auth');
const flight=require('./FlightInfo')
const router = express.Router();

router.use('/auth', auth);
router.use('/',flight)
module.exports = router;
