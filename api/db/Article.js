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

    },
    signal: [{

        userId: String
    

    }]
    


});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article