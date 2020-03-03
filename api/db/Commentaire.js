// Toujour Commenter
/**
 * Model ...
 * 
 */


const mongoose = require('mongoose');



const CommentaireSchema = new mongoose.Schema({

        article_id: String,
        username: String,
        content: String, 
        createDate: {
            type: Date,
            default: new Date()
    }
        

})

const Commentaire = mongoose.model('Commentaire', CommentaireSchema);


module.exports = Commentaire