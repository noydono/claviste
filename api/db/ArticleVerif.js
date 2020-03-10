var mongoose = require('mongoose');


var ArticleVerifSchema = new mongoose.Schema({

    title: String,
    content: String,
    author: String,
    date: String,
    img: String,
    nameImg: String,
     commentaire: [
        {
            avatarImg:String,
            article_id: String,
            username: String,
            content: String,
            dateLe: String,
            dateA: String,
        }
    ],like:[
        {

        userId:String

    }
]


});

const ArticleVerif = mongoose.model('ArticleVerif', ArticleVerifSchema);

module.exports = ArticleVerif