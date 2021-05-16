var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app     = express();
var data 	= require('./data.json');
var db 	= require('./dbconn');
PORT        = 19524;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

//Public files
app.use(express.static('public'));

//Routes
app.get('/', function(req, res){
    res.status(200).render('home')
});

//Displaying data routes
app.get('/fishes', function(req, res){
	let query = 'SELECT fish_id, species, age, tank_id, volume_needed FROM Fishes;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
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
			res.status(400);
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
			res.status(400);
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
			res.status(400);
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
			res.status(400);
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

//Filtered Data Displaying Routes
app.get('/fishes_filter', function(req, res){
	//Query Creation
	let data = req.query;
	let id = data['get_fish_id'];
	let species = data['get_species'];
	let age = data['get_age'];
	let tank_id = data['get_tank_id'];
	let volume = data['get_volume_needed'];
	let query = 'SELECT fish_id, species, age, tank_id, volume_needed FROM Fishes WHERE fish_id LIKE \"%'+id+'%\" AND species LIKE \"%'+species+'%\" AND age LIKE \"%'+age+'%\" AND tank_id LIKE \"%'+tank_id+'%\" AND volume_needed LIKE \"%'+volume+'%\";';

	//query execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}
		res.status(200).render('fishes', {Fishes: rows});
	});
});

//Adding Data Routes
app.post('/input_fishes', function(req, res){
	//Query Creation
	let data = req.body;
	let species = data['set_species'];
	let age = data['set_age'];
	let tank = data['set_tank_id'];
	let volume = data['set_volume_needed'];
	let query = 'INSERT INTO Fishes (species, age, tank_id, volume_needed) VALUES (\"'+species+'\", '+age+', '+tank+', '+volume+');';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).redirect('/fishes');
			return;
		}
		else{
			res.status(200).redirect('/fishes');
		}
	});
});

app.post('/input_feeds', function(req, res){
	//Query Creation
	let data = req.body;
	let name = data['set_name'];
	let stock = data['set_stock'];
	let query = 'INSERT INTO Feeds (name, stock) VALUES (\"'+name+'\", '+stock+');';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).redirect('/feeds');
			return;
		}
		else{
			res.status(200).redirect('/feeds');
		}
	});
});

app.post('/input_plants', function(req, res){
	//Query Creation
	let data = req.body;
	let species = data['set_species'];
	let tank = data['set_tank_id'];
	let query = 'INSERT INTO Plants (species, tank_id) VALUES (\"'+species+'\", '+tank+');';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).redirect('/plants');
			return;
		}
		else{
			res.status(200).redirect('/plants');
		}
	});
});

app.post('/input_pumps', function(req, res){
	//Query Creation
	let data = req.body;
	let flow = data['set_flow_rate'];
	let age = data['set_age'];
	let query = 'INSERT INTO Pumps (flow_rate, age) VALUES ('+flow+', '+age+');';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).redirect('/pumps');
			return;
		}
		else{
			res.status(200).redirect('/pumps');
		}
	});
});

app.post('/input_tanks', function(req, res){
	//Query Creation
	let data = req.body;
	let volume = data['set_volume'];
	let pump = data['set_pump_id'];
	let query = 'INSERT INTO Tanks (volume, pump_id) VALUES ('+volume+', '+pump+');';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).redirect('/tanks');
			return;
		}
		else{
			res.status(200).redirect('/tanks');
		}
	});
});

//404 Page
app.get('*', function(req, res){
	res.status(404).render('404');
});

//Listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
