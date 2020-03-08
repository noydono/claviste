const Handlebars = require('handlebars');

// helper pour limit l'affichage par rapport au nombre de verification
Handlebars.registerHelper('filter30', function (a, b) {


    let pourcentage = a.articleVerified / b.length * 100,
        limitVerif = a.articleVerified * 20 / 100

    if (pourcentage < limitVerif || a.articleVerified == 0) {


    } else if (pourcentage >= limitVerif) {

        let numberCom =  a.commentaire.length
        return this && numberCom;
         

    }
});
// helper pour limit l'affichage si l'article n'a pas assez de verif
Handlebars.registerHelper('filterAVerif', function (a, b) {


    let pourcentage = a.articleVerified / b.length * 100,
        limitVerif = a.articleVerified * 20 / 100

    if (pourcentage < limitVerif || a.articleVerified == 0) {

        return this;


    } else if (pourcentage >= limitVerif) {

    }
});

Handlebars.registerHelper('com', function (a) {

    let comInt = a.commentaire.length
    return comInt

});
Handlebars.registerHelper('like', function (a) {

    let likeInt = a.like.length
    return likeInt;
    
});


module.exports = Handlebars