const axios = require('axios');
const baseURL = 'https://codedcoder:busola@opensky-network.org/api';

const flightInfo = {
  async arrival(req, res) {
    try {
      const { airport, days } = req.body;
      let end = Math.round(new Date().getTime() / 1000);
      let day=(1000*60*60*24)/1000;
      let begin=end-day*days

      const response = await axios.get(
        `${baseURL}/flights/arrival?airport=${airport}&begin=${begin}&end=${end}`
      );
      return res.json({
        success: true,
        data: response.data
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'No values found for the specified time frame'
      });
    }
  },
  async departure(req, res) {
    try {
      const { airport, days } = req.body;
      let end = Math.round(new Date().getTime() / 1000);
      let day = (1000 * 60 * 60 * 24) / 1000;
      let begin = end - day * days;

      const response = await axios.get(
        `${baseURL}/flights/departure?airport=${airport}&begin=${begin}&end=${end}`
      );
      return res.json({
        success: true,
        data: response.data
      });
    } catch (error) {
      return res.json({
        success: false,
        message: 'No values found for the specified time frame'
      });
    }
  }
};

module.exports = flightInfo;
