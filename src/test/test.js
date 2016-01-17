var ArticleModel = require('../libs/mongoose').ArticleModel;
var assert = require('assert');

const articleContent = {
	text: "Text of article", 
	title: "Title of article"
};

describe("Articles", function(){ 

	afterEach(function(done) {
	    ArticleModel.remove({}, function(err) { 
		   console.log('collection removed') 
		   done()
		});
	  });

	beforeEach(function(done) {
	ArticleModel.create([articleContent, articleContent], function (err, article) {     
	     console.log('2 objects are added')
	     done() 
	}); 
	});

	describe('Successful scenario.', function(){

			it("Should create new article with required parameters", function(done){    
			    ArticleModel.create(articleContent, function (err, article) {
			    	assert.equal(articleContent.text, article.text);   
			    	assert.equal(articleContent.title, article.title);   
			      	done();    
			    });
		    });

		  	it("Should find articles with given parameters", function(done){  
			    ArticleModel.find({text: articleContent.text},function (err, articles) {
				   assert.equal(articles.length, 2)
				   done()
			    });
			});


		  	it("Should find articles without parameters", function(done){  
			    ArticleModel.find(function (err, articles) {
				   assert.equal(articles.length, 2)
				   done()
			    });
			});

		    it("Should find one article with given parameters", function(done){  
			    ArticleModel.findOne({text: articleContent.text},function (err, article) {
				   assert.equal(articleContent.title, article.title)
				   done()
			    });
			});

		    it("Should find one article without parameters", function(done){  
			    ArticleModel.findOne(function (err, article) {
				   assert.equal(articleContent.title, article.title)
				   done()
			    });
			});
		});

		describe('Error handling scenario.', function(){
			it("Should throw exception if create new article without required parameters.", function(done){

				ArticleModel.create({title: articleContent.title},function (err, article) {
					if (article == undefined){
						assert.equal(err.message, "articles validation failed");
					} else {
						assert.fail("Should not save record if there no required parameters."); 						
					} 

					done()
			    });
			});
		});

});

