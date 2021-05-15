var express = require('express');
var exphbs  = require('express-handlebars');
var app     = express();
var data 	= require('./data.json');
var db 	= require('./dbconn');
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
	let query = 'SELECT fish_id, species, age, tank_id, volume_needed FROM Fishes;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}
		res.status(200).render('fishes', {Fishes: rows});
	});
});

app.get('/tanks', function(req, res){
	let query = 'SELECT tank_id, volume, pump_id FROM Tanks;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}
		res.status(200).render('tanks', {Tanks: rows});
	});
});

app.get('/feeds', function(req, res){
	let query = 'SELECT feed_id, name, stock FROM Feeds;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}
		res.status(200).render('feeds', {Feeds: rows});
	});
});

app.get('/pumps', function(req, res){
	let query = 'SELECT pump_id, flow_rate, age FROM Pumps;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}
		res.status(200).render('pumps', {Pumps: rows});
	});
});

app.get('/plants', function(req, res){
	let query = 'SELECT plant_id, species, tank_id FROM Plants;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}
		res.status(200).render('plants', {Plants: rows});
	});
});

app.get('/fish_feeds', function(req, res){
	res.status(200).render('fish_feeds', data)
});

app.get('/plants_pumps', function(req, res){
	res.status(200).render('plants_pumps', data)
});

//404 Page
app.get('*', function(req, res){
	res.status(404).render('404');
});

//Listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
