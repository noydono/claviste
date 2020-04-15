const Handlebars = require('handlebars');

// helper pour  l'affichage du nombre de like
Handlebars.registerHelper('like', function (a) {

    let likeInt = a.like.length
    return likeInt;

});

Handlebars.registerHelper('verif', function (a) {

    let verifInt = a.articleVerified
    return verifInt;

});


module.exports = Handlebars