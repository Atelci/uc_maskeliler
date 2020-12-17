const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    status: String,
    fileName: String,
});

module.exports = mongoose.model('Upload', uploadSchema);