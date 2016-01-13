var	mongoose    = require('mongoose');


mongoose.connect('mongodb://localhost/mocha_test_new');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error');
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

var Article = new Schema({
    title: { type: String},
    text: { type: String}
});

var ArticleModel = mongoose.model('articles', Article);

module.exports.ArticleModel = ArticleModel;