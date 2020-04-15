
const ArticleVerif = require('../../db/ArticleVerif'),
    User = require('../../db/User'),
    Com = require('../../db/commentaire'),
    format = require('date-format');

module.exports = {

    addCom: (req, res) => {

        dateLe = format.asString('dd-MM-yyyy', new Date()),
        dateA = format.asString('hh:mm:ss', new Date()),

        Com.create({

            dateLe: dateLe,
            dateA: dateA,
            article_id: req.params.id,
            username: req.session.username,
            content: req.body.content,
            user_id: req.session.userId
            
        })
        
        res.redirect('back')

    },
    addLike: async (req, res) => {

        const dbUser = await User.findById(req.session.userId),
            dbArticleVerif = await ArticleVerif.findById(req.params.id)
            ldLike = dbUser.like,
            valLike = ldLike.filter((a) => {

                return a.article_id === req.params.id

            })

        console.log(valLike.length);

        if (valLike.length === 0) {

            ArticleVerif.findByIdAndUpdate(req.params.id, {
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
                        article_id: req.params.id,
                        title: dbArticleVerif.title
                    }
                }
            }, (error, success) => {
                if (error) {

                    console.log(error);

                } else {

                }
            });

            req.flash('addLike','.');
            res.redirect('back');

        } else {

            console.log('vous avez deja liker cette article');
            req.flash('likeErr', '.');
            res.redirect('back');

        }

    }

}