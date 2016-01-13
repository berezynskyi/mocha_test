var ArticleModel = require('../libs/mongoose').ArticleModel;
var assert = require('assert');
var should = require('should')


describe("Articles", function(){ 

  afterEach(function(done) {
    ArticleModel.remove({}, function(err) { 
	   console.log('collection removed') 
	   done()
	});
  });

   beforeEach(function(done) {
	ArticleModel.create([{text: "test", title: "title"}, {text: "test", title: "title"}], function (err, article) {     
	     console.log('2 objects are added')
	     done() 
	}); 
  });

  it("creates new article", function(done){    
	    ArticleModel.create({text: "test", title: "title"}, function (err, article) {
	      article.text.should.equal("test");      
	      article.title.should.not.equal("title1");      
	      done();    
	    });
    });

  it("finds articles", function(done){  

	    ArticleModel.find(function (err, articles) {
		   articles.length.should.equal(2)
		   done()
	    });

	});

    it("findOne article", function(done){  

	    ArticleModel.findOne(function (err, article) {
		   article.text.should.equal("test")
		   article.title.should.equal("title")
		   done()
	    });

	});

});

