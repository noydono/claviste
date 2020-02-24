const Article = require('../../db/Article'),
path = require('path'),
fileupload = require('express-fileupload')





module.exports = {

    create: (req, res) => {

        console.log(req.files);

        // if (!req.files) {

        //     res.redirect('/')

        // } else {

        //     Article.create({

        //         title: req.body.title,
        //         content: req.body.content,
        //         author: req.body.author,
        //         image: `public/imgArticle/${image.name}`,
        //         createDate: new Date()

        //     }, (err, post) => {

        //         if (err) {
        //             console.log('article nest pas post ' + err);

        //         } else {
        //             console.log('article crée');

        //             res.redirect('/')
        //         }
        //     })

        // }




    },


    update: async (req, res) => {

        console.log('update article');
        console.log(req.params.id);

        const dbArticle = await Article.find({ id: req.params.id })




        Article.findByIdAndUpdate(req.params.id, {

            title: req.body.title,
            content: req.body.content,
            author: req.body.author,


        }, (err, post) => {

            if (err) {
                console.log('article nest pas post ' + err);

            } else {
                console.log('article crée');

                res.redirect('/')
            }
        })


    },
    delete: (req, res) => {

        Article.findByIdAndRemove(req.params.id, (err) => {

            if (err) {
                console.log('article nest pas Delete ' + err);

            } else {
                console.log('article Delete');

                res.redirect('/')
            }
        })

    }
}