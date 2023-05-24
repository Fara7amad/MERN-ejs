const express = require('express');
const router = express.Router();
const {getLogggin,postLoggin, getSignup, postSignup,logout}=require('../controllers/auth');

router.get('/signup',getSignup);
router.post('/signup',postSignup);
router.get('/', getLogggin);
router.post('/', postLoggin);
router.post('/logout', logout)

module.exports = router;
