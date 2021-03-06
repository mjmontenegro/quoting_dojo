var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({
    name: String,
    quote: String,
})
mongoose.model('User', UserSchema);
var User = mongoose.model('User');


app.get('/', function(req, res) {
    res.render("index");
});

app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    res.redirect('/');
});


app.listen(8000, function() {
    console.log("listening on port 8000");
});
