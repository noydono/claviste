const Contact = require('../../db/contact'),
format = require('date-format');

module.exports = {


    create: (req, res) => {

        console.log('dans le contact create');

        const sess = req.session;

        dateLe = format.asString('dd-MM-yyyy', new Date()),
        dateA = format.asString('hh:mm:ss', new Date()),

        Contact.create({

            dateLe: dateLe,
            dateA: dateA,
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

    },
    list: async (req, res) => {

        dbContact = await Contact.find({}),
        Contacts = dbContact.reverse() 

        res.render('admin/contact/listContact',{
            dbContact : Contacts,
            contactDel : req.flash('contactDel')

        })

    },
    delContact: async (req, res) => {

        const dbContact = await Contact.findById({ _id: req.params.id })
        dbContact.deleteOne({ _id: req.params.id })
        req.flash('contactDel', '.')
        res.redirect('back')
    }
}

