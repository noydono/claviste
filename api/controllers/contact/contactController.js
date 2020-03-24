const Contact = require('../../db/contact')
module.exports = {


    create: (req, res) => {

        console.log('dans le contact create');

        const sess = req.session;

        Contact.create({

            sujet: req.body.sujet,
            email: req.body.email,
            destinataire: req.body.destinataire,
            content: req.body.content,
            userId: sess.userId

        }, (err, post) => {
            if (err) {
                console.log("message contact pas envoyer" + err);

            } else {

                console.log("mesage envoyer");

                res.redirect('/')

            }
        })

    }
}