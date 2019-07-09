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
    name: {type: String},
    quote: {type: String},
},
    {timestamps: true},
)
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.get('/', function(req, res) {
    res.render("index");
});

app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    //add to db

    var user = new User({name: req.body.name, quote: req.body.quote});
    user.save(function(err) {
        if (err) {
            console.log('something went wrong', req.body.name, req.body.quote);
        }
        else {
            console.log('successfully added a user', req.body.name, req.body.quote)
        }
        res.redirect('/quotes');
    })
});

app.get('/quotes', function(req, res) {
    console.log("displaying get for /quotes route");
    User.find({}, function(err, users) {
        if (err) {
            console.log("There was an error retrieving the users in the database");
        }
        res.render("quotes", { users:users });
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
});
