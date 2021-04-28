var express = require('express');
var exphbs  = require('express-handlebars');
var app     = express();
var data = require('./data.json');
PORT        = 19524;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Public files
app.use(express.static('public'));

//Routes
app.get('/', function(req, res){
    res.status(200).render('home')
});

app.get('/fishes', function(req, res){
	res.status(200).render('fishes', data)
});

app.get('/tanks', function(req, res){
	res.status(200).render('tanks', data)
});

app.get('/feeds', function(req, res){
	res.status(200).render('feeds', data)
});

app.get('/pumps', function(req, res){
	res.status(200).render('pumps', data)
});

app.get('/plants', function(req, res){
	res.status(200).render('plants', data)
});

//404 Page
app.get('*', function(req, res){
	res.status(404).render('404');
});


//Listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
