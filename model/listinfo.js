const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const listinfoSchema = new Schema({
    title: {type: String, require: true},
    nickname: {type: String, require: true},
    content: {type: String, require: true},
    buttonNumber: {type: Number, require: true},
});

module.exports = mongoose.model("listinfo",listinfoSchema);