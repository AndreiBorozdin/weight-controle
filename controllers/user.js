const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const error = require('../utils/error')
const User = require('../models/user')

module.exports.login = async function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res
            .status(500)
            .json({ message: 'No empty fields allowed' });
    }
    const candidate = await User.findOne({username: req.body.username})
    if(candidate){
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            const token = jwt.sign({
                username: candidate.username,
                _id: candidate._id
            }, keys.devJwt, {expiresIn: '1d'})
            res.status(200).json({
                token: `Bearer ${token}`,
                message: 'Вы можете зайти в систему'
            })
        }else{
            res.status(401).json({
                message: "Пароли не совпадают. Попробуйте снова."
            })
        }
    }else{
        res.status(404).json({
            message: "Пользователь с таким ником не найден"
        })
    }
}

module.exports.signup = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    const candidateUsername = await User.findOne({username: req.body.username})
    if(candidate){
        res.status(409).json({
            message: 'Такой email уже занят'
        })
    }
    else if(candidateUsername){
        res.status(409).json({
            message: 'Такой ник уже занят'
        })
    }else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            height: +req.body.height,
            weight: +req.body.weight,
            age: +req.body.age,
            gender: req.body.gender,
            //procentFat: this.height + this.weight,
            procentFat: req.body.height + req.body.weight
        })
        try{
            await user.save()
            res.status(201).json(user)
        }catch (err) {
            error(res, err)
        }

    }


}
module.exports.getProfile = async function (req, res) {
   try{
       const user = await User.findById(req.user._id)
        //const user = await User.findOne({user: req.user._id})
       //const user = await User.findById(req.params.id)
       // await Questi.deleteOne({_id: req.params.id})
       res.status(200).json(user);
   }catch (err) {
       error(res, err)
   }
}
