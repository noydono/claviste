const Handlebars = require('handlebars');


// helper pour limit l'affichage si l'article n'a pas assez de verif
Handlebars.registerHelper('filterAVerif', function (a, b) {


    let pourcentage = a.articleVerified / b.length * 100,
        limitVerif = b.length * 20 / 100

    if (pourcentage < limitVerif || a.articleVerified == 0) {

        return this;
        
    }
});
// helper pour  l'affichage du nombre de com

Handlebars.registerHelper('com', function (a) {

    let comInt = a.commentaire.length
    return comInt

});
// helper pour  l'affichage du nombre de like

Handlebars.registerHelper('like', function (a) {

    let likeInt = a.like.length
    return likeInt;
    
});


// Warning: untested code
Handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

module.exports = Handlebars


