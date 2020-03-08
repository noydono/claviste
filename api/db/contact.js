var mongoose = require('mongoose');


var ContactSchema = new mongoose.Schema({

    sujet: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    destinataire: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    userId: String


});

const contact = mongoose.model('Contact', ContactSchema);

module.exports = contact