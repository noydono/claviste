const Article = require('../api/db/Article');

describe('CREATE // Creation Article', () => {
    it('CREATE 1 // Créé article title test', (done) => {

        Article.create({

            title: 'test',
            content: 'test',
            author: 'test',
            cover: 'test',
            nameCover: 'test',
            callery: [],
            createDate: 'test',
            signal:[]

        })
        done()
    })
});