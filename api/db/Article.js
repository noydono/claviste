var mongoose = require('mongoose');


var ArticleSchema = new mongoose.Schema({

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
    articleVerified: {

        type: Number,
        default: 0

    },
    signal: [{

        userId: String
    
    }],
    activiteDate: String,
    
    
    
    
   
    
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article