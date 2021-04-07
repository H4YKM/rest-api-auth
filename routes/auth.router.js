const { Router } = require('express');
const router = Router();

router.get('/login' ,(req, res) => {
  res.type('html');
  res.render('login', {
    title: 'Login',
    active: 'login'
  });
});

router.get('/register' ,(req, res) => {
  res.type('html');
  res.render('register', {
    title: 'Register',
    active: 'register'
  });
});

module.exports = router;