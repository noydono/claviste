//inside create_test.js
// DB
const mongoose = require('mongoose');
const Article = require('../api/db/Article')

// Config Chai
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');
const faker = require('faker')



describe('Mocha CRUD', () => {

  var articleId = ""

  afterEach(function(done){

    Article.findById(articleId,(err,sucess) => {

      if(err){

        done(err)

      }else{
        // console.log(sucess)
        done()

      }
    })
      
  });


  it('Create Article non verifier', (done) => {

    Article.create({


      title: "string",
      content: "string",
      author: "string",
      cover: faker.image.image(),
      nameCover: "string",
      callery: [{
        img: faker.image.image(),
        nameImg: "string"
      }],
      signal: [{
        userId: 'string'
      }]

    }, (err, post) => {

      if (err) {

        done(err)

      } else {

        articleId = post._id
        expect(post.title).to.be.a('string')
        expect(post.content).to.be.a('string')
        expect(post.author).to.be.a('string')
        expect(post.cover).to.be.an('string')
        expect(post.nameCover).to.be.a('string')
        expect(post.callery).to.be.an('array')
        expect(post.callery[0].img).to.be.a('string')
        expect(post.callery[0].nameImg).to.be.a('string')
        expect(post.signal).to.be.an('array')
        expect(post.signal[0].userId).to.be.a('string')
        done()

      }

    })

  })

  it('read Article non verifier', (done) => {


    Article.findById(articleId,(err,sucess) => {

      if(err){

        done(err)

      }else{

        // console.log(sucess)
        done()

      }
    })


  })

  it('Update Article non verifier', (done) => {


    Article.findByIdAndUpdate(articleId,{


      title: "update",
      content: "update",
      author: "update",
      cover: faker.image.image(),
      nameCover: "update",
      callery: [{
        img: faker.image.image(),
        nameImg: "update"
      }],
      signal: [{

        userId: 'update'

      }]

    }, (err, sucess) => {

      if (err) {

        done(err)

      } else {

        expect(sucess.title).to.be.a('string')
        expect(sucess.content).to.be.a('string')
        expect(sucess.author).to.be.a('string')
        expect(sucess.cover).to.be.an('string')
        expect(sucess.nameCover).to.be.a('string')
        expect(sucess.callery).to.be.an('array')
        expect(sucess.callery[0].img).to.be.a('string')
        expect(sucess.callery[0].nameImg).to.be.a('string')
        expect(sucess.signal).to.be.an('array')
        expect(sucess.signal[0].userId).to.be.a('string')
        done()

      }

    })

  })

  it('delete Article non vérifier', (done) => {
    
    Article.findByIdAndRemove(articleId,(err,sucess)=> {


      if(err){

        done(err)

      }else{

        done()

      }

    })

  })

  

});