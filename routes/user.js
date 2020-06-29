const express = require('express')
const controller = require('../controllers/user')
const passport = require('passport')
const router = express.Router()

router.post('/login', controller.login)
router.post('/register', controller.signup)
router.get("", passport.authenticate("jwt", { session: false }), controller.getProfile);

module.exports = router