var mongoose = require('mongoose');


var ArticleSchema = new mongoose.Schema({

    title: String,
    content: String,
    author: String,
    date: String,
    img: String,
    nameImg: String,
    articleVerified: {

        type: Number,
        default: 0

    }, commentaire: [
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

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article