const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username: username,
      password: password
    });
    if (!user) {
      return res.json({
        success: false,
        message: 'Invalid Credentials'
      });
    }
    const token = jwt.sign(
      {
        userId: user.id
      },
      'secret',
      {
        expiresIn: '24h'
      }
    );
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username
      },
      token: token,
      success: true
    });
  } catch (error) {
    return error;
  }
};

module.exports = login;
