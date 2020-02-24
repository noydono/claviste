
const Article = require('../../db/Article')

module.exports = {

    get: async (req,res) => {

        const dbArticle = await Article.find({})   

        res.render('index',{
            dbArticle
        })
    }


}