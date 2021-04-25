var express = require('express');
var exphbs  = require('express-handlebars');
var app     = express();
PORT        = 19524;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function(req, res){
    res.status(200).render('temp')
});

app.get('*', function(req, res){
	res.status(404).render('404');
});

app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
