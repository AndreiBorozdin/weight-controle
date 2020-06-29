const Diary = require('../models/diary');
const error = require('../utils/error');


module.exports.getAll = async function(req, res) {
    try {
        const diary = await Diary.find({user: req.user.id})
        res.status(200).json(diary)
    } catch (e) {
        error(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const diary = await new Diary({
            everyDayWeight: req.body.everyDayWeight,
            lowerOrHigh: req.body.lowerOrHigh,
            created: Date.now(),
            user: req.user.id
        }).save()
        res.status(201).json(diary)
    } catch (e) {
        error(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const diary = await Diary.findOneAndUpdate({_id: req.params.id}, {$set: req.body, created: Date.now()}, {new: true})
        res.status(200).json(diary)
    } catch (e) {
        error(res, e)
    }
}
module.exports.delete = async function(req, res) {
    try {
        await Diary.deleteOne({_id: req.params.id})
        res.status(200).json({message: 'Запись удалена'})
    } catch (e) {
        error(res, e)
    }
}