const mongoose = require('mongoose');



const SignaleSchema = new mongoose.Schema({



    userId: String,
    article_id: String,
    content: String,
    dateLe: String,
    dateA: String,


})




const Signale = mongoose.model('Signale', SignaleSchema);


module.exports = Signale