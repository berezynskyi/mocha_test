// var express = require('express');
// var 
var express = require('express')
var app = express()
var ArticleModel = require('./libs/mongoose').ArticleModel;
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(express.static(__dirname + '/js')); 

// here you set that all templates are located in `/views` directory
app.set('views', __dirname + '/views');


// here you set that you're using `ejs` template engine, and the
// default extension is `ejs`
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/getListOfArticles', function(req, res) {

    return ArticleModel.find( function (err, articles) {
        if (!err) {
        	var response = _.cloneDeep(articles)

            return res.send(response);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

app.get('/getArticleById/:id', function(req, res) {

    return ArticleModel.findOne({_id : req.params.id}, function (err, articles) {
        if (!err) {
            return res.send(articles);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

app.post('/addArticle', function(req, res) {
    
    ArticleModel.create({text: req.body.text, title:req.body.title}, function (err, article) {
        if (!err) {
			res.statusCode = 200;
            return res.send();
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})