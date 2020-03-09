// Toujour Commenter
/**
 * Controller ...
 * 
 */

const Article = require('../../db/Article'),
    User = require('../../db/User'),
    format = require('date-format');

module.exports = {

    addCom: async (req, res) => {

        console.log('add Com');
        const dbArticle = await Article.find({
            _id: req.params.id
        }),
        dateLe = format.asString('dd-MM-yyyy', new Date()),
        dateA = format.asString('hh:mm:ss', new Date()),
            recup = {

                dateLe: dateLe,
                dateA: dateA,
                article_id: req.params.id,
                username: req.session.username || req.session.lastname + " " + req.session.firstname,
                content: req.body.content,
                avatarImg: req.session.avatarImg

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


        const dbUser = await User.findById(req.session.userId),
            ldLike = dbUser.like,
            valLike = ldLike.filter((a) => {

                return a.article_id === req.params.id

            })
        console.log(valLike.length);

        if (valLike.length === 0) {


            Article.findByIdAndUpdate(req.params.id, {
                $push: {
                    like: {
                        userId: req.session.userId
                    }
                }
            }, (error, success) => {
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
            }, (error, success) => {
                if (error) {

                    console.log(error);
                } else {

                }
            });
            res.redirect('/')

        } else {

            console.log('vous avez deja liker cette article');
            req.flash('likeErr', 'vous avez deja like cette article')
            res.redirect('/')

        }

    }

}