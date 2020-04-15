var mongoose = require('mongoose');


var ArticleVerifSchema = new mongoose.Schema({

    title: String,
    content: String,
    author: String,
    date: String,
    cover:String,
    nameCover:String,
    callery: [{
        nameImg : String,
        img : String
    }],
    like:[{

        userId:String,
        title:String

    }],
    activiteDate: String


});

const ArticleVerif = mongoose.model('ArticleVerif', ArticleVerifSchema);

module.exports = ArticleVerif