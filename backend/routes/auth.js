const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();

const JWT_SECRET = config.jwtSecretKey;

router.get('/', async (req, res) => {
  try {
    res.send('Try to login or signup first');
  } catch (error) {
    res.status(500).send('Internal server error: ' + error.messaage);
  }
});

router.post(
  '/sign-up',
  [
    body('email', 'Enter a valid email').isEmail(), // wae can even give custom messages
    body('password', 'Enter a valid password(min 5 characters)').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // validation of form
    let success = false;
    const errors = validationResult(req);
    //return bad request if any error
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // unique email check
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, errors: 'this email is already registered' });
      }
      const salt = await bcrypt.genSalt(config.saltRounds);

      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); // jwt also helps us to know if there has been any tempering with the data
      success = true;
      res.json({ success, authToken }); // will return a token which we will use for faster authentication of user
    } catch (err) {
      return res
        .status(500)
        .json({ success, error: 'Internal Server Error: ' + err.message });
    }
  },
);

router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success = false;
    // validation of form

    const errors = validationResult(req);
    //return bad request if any error
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //ideal case i.e. no error
    const { email, password } = req.body; //destructuring
    try {
      let user = await User.findOne({ email });
      // no user with such email id found
      if (!user) {
        return res.status(400).json({
          success,
          error: 'User not found.Invalid login credentials.',
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      // password mismatch
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: 'User not found.Invalid login credentials.',
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      return res
        .status(500)
        .json({ success, error: 'Internal server error: ' + error.messaage });
    }
  },
);

router.post('/user', fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password'); // will select all document argument except password
    res.send(user);
  } catch (error) {
    return res
      .status(500)
      .json({ success, error: 'Internal server error: ' + error.messaage });
  }
});

module.exports = router;
