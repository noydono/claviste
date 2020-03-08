// Toujour Commenter
/**
 * Controller ...
 * 
 */

const Article = require('../../db/Article'),
    User = require('../../db/User')

module.exports = {

    addCom: async (req, res) => {

        console.log('add Com');
        const dbArticle = await Article.find({
                _id: req.params.id
            }),
            recup = {
                createDate: new Date(),
                article_id: req.params.id,
                username: req.session.username || req.session.lastname + " " + req.session.firstname,
                content: req.body.content,
                avatar: req.session.avatar

            }

        Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    commentaire: recup
                }
            },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });

        res.redirect('/')

    },
    DelCom: async (req, res) => {

        const dbCom = await Com.findById({
            _id: req.params.id
        })
        dbCom.deleteOne({
            _id: req.params.id
        })
        res.redirect('/')





    },
    addLike: async (req, res) => {


        const test = await Article.find({
            _id: req.params.id
        })



        Article.findByIdAndUpdate(req.params.id, {
                $push: {
                    like: {
                        userId: req.session.userId
                    }
                }
            },
            function (error, success) {
                if (error) {

                    console.log(error);
                } else {
                    

                }
            });
        User.findOneAndUpdate({
                _id: req.session.userId
            }, {
                $push: {
                    like: {
                        article_id: req.params.id
                    }
                }
            },
            function (error, success) {
                if (error) {

                    console.log(error);
                } else {
                    
                }
            });


        res.redirect('/')

    }

}