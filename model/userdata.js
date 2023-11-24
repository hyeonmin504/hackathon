const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userdataSchema = new Schema({
    nickname: {type: String, require: true},
    password: {type: String, require: true},
});

module.exports = mongoose.model("userdata",userdataSchema);