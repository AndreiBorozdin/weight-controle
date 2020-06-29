const express = require('express')
const controller = require('../controllers/diary')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete)

module.exports = router



/*const express = require('express')
const controller = require('../controllers/questy')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getQuesti)
router.get('/:id',passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id',passport.authenticate('jwt', {session: false}), controller.delete)
router.post('/',  passport.authenticate('jwt', {session: false}), controller.create)
//router.patch('/:id',passport.authenticate('jwt', {session: false}), controller.edit)

module.exports = router*/


