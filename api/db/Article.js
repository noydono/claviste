var mongoose = require('mongoose');


var ArticleSchema = new mongoose.Schema({

    title: String,
    content: String,
    author: String,
    createDate: {
        type: Date,
        default: new Date()
        },
<<<<<<< HEAD
    img: String,
    nameImg : String,
    articleVerified: {

        type:Number,
        default: 0
        
    }
=======
    img:String,
    nameImg : String
>>>>>>> thibault
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article