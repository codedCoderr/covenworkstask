const axios=require('axios')
const baseURL = 'https://codedcoder:busola@opensky-network.org/api';

const flightInfo = async (req, res) => {
  try {
    const response = await axios.get(
      `${baseURL}/`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error) ;
  }
};

module.exports = flightInfo;
