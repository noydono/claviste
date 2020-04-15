// Toujour Commenter
/**
 * Model ...
 * 
 */


const mongoose = require('mongoose');



const CommentaireSchema = new mongoose.Schema({

    article_id: String,
    avatarImg: String,
    article_id: String,
    username: String,
    content: String,
    dateLe: String,
    dateA: String,
    
})




const Commentaire = mongoose.model('Commentaire', CommentaireSchema);


module.exports = Commentaire