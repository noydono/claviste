var mongoose = require('mongoose');


var ArticleSchema = new mongoose.Schema({

    title: String,
    content: String,
    author: String,
    createDate: {
        type: Date,
        default: new Date()
        },
    image:String
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article