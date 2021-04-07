const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const router = Router();

const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', [
  body('email', 'Incorrect email.').isEmail(),
  body('password', 'Incorrect password.').isLength({min: 6, max: 12})
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const candidate = await User.findOne({email});

    if (candidate) {
      return res.status(400).json({message: 'User with this email already exists.'});
    }

    const hashedP = bcrypt.hashSync(password, 7);

    const user = new User({email, password: hashedP});
    await user.save();

    res.status(201).json({message: 'User registered.'});

  } catch (e) {
    res.status(400).json({message: 'Incorrect data, try again.'});
    console.log(e);
  }
});

router.post('/login', [
  body('email', 'Incorrect email.').isEmail(),
  body('password', 'Incorrect password.').isLength({min: 6, max: 12})
] ,async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({message: 'User is not found.'});
    }

    const candidate = bcrypt.compareSync(password, user.password);

    if (!candidate) {
      return res.status(400).json({message: 'Password mismatch.'});
    }

    return res.status(200).json({message: 'Login successful.'});

  } catch (e) {
    res.status(400).json({message: 'Incorrect data, try again.'});
  }
});

module.exports = router;