const Handlebars = require('handlebars');

// helper pour limit l'affichage par rapport au nombre de verification
Handlebars.registerHelper('filter30', function (a, b) {


    let pourcentage = a.articleVerified / b.length * 100,
        limitVerif = b.length * 20 / 100

    if (pourcentage >= limitVerif) {

        return this ;
    
    }
});
// helper pour limit l'affichage si l'article n'a pas assez de verif
Handlebars.registerHelper('filterAVerif', function (a, b) {


    let pourcentage = a.articleVerified / b.length * 100,
        limitVerif = b.length * 20 / 100

    if (pourcentage < limitVerif || a.articleVerified == 0) {

        return this;
        
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