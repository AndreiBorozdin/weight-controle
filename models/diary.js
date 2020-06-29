const mongoose = require('mongoose')
const Schema = mongoose.Schema

const diarySchema = new Schema({
   everyDayWeight: {
       type: Number,
       required: true
   },
    created: { type: Date,
              default: Date.now() },
    lowerOrHigh: {
       type: Boolean
    },
    user: {type: Schema.Types.ObjectId, ref: 'users'}
})

module.exports = mongoose.model('diary', diarySchema)