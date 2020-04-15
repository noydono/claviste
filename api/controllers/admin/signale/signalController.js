const ArticleVerif = require('../../../db/ArticleVerif'),
        User = require('../../../db/User'),
        Signale = require ('../../../db/signale'),
        format = require('date-format');

  

module.exports = {

    list: async (req, res) => {

        dbSignale = await Signale.find({ article_id: req.params.id }),
        signales = dbSignale.reverse() 

        res.render('admin/signale/listSignale',{
            dbSignale: signales,
            signaleDel : req.flash('signaleDel')
            
        })

    },
    postSignale: (req,res) => {

        console.log('coucou');
        

        dateLe = format.asString('dd-MM-yyyy', new Date()),
        dateA = format.asString('hh:mm:ss', new Date())


        Signale.create({

            dateLe: dateLe,
            dateA: dateA,
            userId: req.session.userId,
            article_id: req.params.id,
            content: req.body.content

        })
        req.flash('signaleC','.')
        res.redirect('back')

    },
    delSignale: async (req, res) => {

        const dbSignale = await Signale.findById({ _id: req.params.id })
        dbSignale.deleteOne({ _id: req.params.id })
        req.flash('signaleDel', '.')
        res.redirect('back')
    }

}