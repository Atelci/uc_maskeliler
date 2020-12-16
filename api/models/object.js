const mongoose = require('mongoose');

const objectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    target_group: String,
    description: String,
    class_number: Number
});

module.exports = mongoose.model('Object', objectSchema);