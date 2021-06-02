var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app     = express();
//var data 	= require('./data.json');
var db 	= require('./dbconn');
PORT        = 19525;

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
	let query2 = 'SELECT tank_id, volume FROM Tanks ORDER BY tank_id ASC;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}

		db.pool.query(query2, function(error, rows2, fields2){
			if(error){
				console.log("Query Failure. Error Code: " + error.code);
				res.status(400);
				return;
			}
			res.status(200).render('fishes', {Fishes: rows, Tanks: rows2});
		});
	});
});

app.get('/tanks', function(req, res){
	let query = 'SELECT tank_id, volume, pump_id FROM Tanks;';
	let query2 = 'SELECT pump_id, flow_rate FROM Pumps ORDER BY pump_id ASC;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}

		db.pool.query(query2, function(error, rows2, fields2){
			if(error){
				console.log("Query Failure. Error Code: " + error.code);
				res.status(400);
				return;
			}
			res.status(200).render('tanks', {Tanks: rows, Pumps: rows2});
		});
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
	let query2 = 'SELECT tank_id, volume FROM Tanks ORDER BY tank_id ASC;';

	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}

		db.pool.query(query2, function(error, rows2, fields2){
			if(error){
				console.log("Query Failure. Error Code: " + error.code);
				res.status(400);
				return;
			}
			res.status(200).render('plants', {Plants: rows, Tanks: rows2});
		});
	});
});

app.get('/fish_feeds', function(req, res){
	let query = 'SELECT * from Fishes; SELECT * from Feeds; Select feed_id, fish_id from Fish_Feeds;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		res.status(200).render('fish_feeds', {data: {
			Fishes: rows[0],
			Feeds: rows[1],
			FF: rows[2]
		}});
	});
});

app.get('/plants_pumps', function(req, res){
	let query = 'SELECT * from Plants; SELECT * from Pumps; Select plant_id, pump_id from Plants_Pumps;';
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		res.status(200).render('plants_pumps', {data: {
			Plants: rows[0],
			Pumps: rows[1],
			PP: rows[2]
		}});
	});
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
	let query2 = 'SELECT tank_id FROM Tanks ORDER BY tank_id ASC;';

	//query execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}

		db.pool.query(query2, function(error, rows2, fields2){
			if(error){
				console.log("Query Failure. Error Code: " + error.code);
				res.status(400);
				return;
			}
			res.status(200).render('fishes', {Fishes: rows, Tanks: rows2});
		});
	});
});

app.get('/feeds_filter', function(req, res){
	//Query Creation
	let data = req.query;
	let id = data['get_feed_id'];
	let name = data['get_name'];
	let stock = data['get_stock'];
	let query = 'SELECT feed_id, name, stock FROM Feeds WHERE feed_id LIKE \"%'+id+'%\" AND name LIKE \"%'+name+'%\" AND stock LIKE \"%'+stock+'%\";';

	//query execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}
		res.status(200).render('feeds', {Feeds: rows});
	});
});

app.get('/plants_filter', function(req, res){
	//Query Creation
	let data = req.query;
	let id = data['get_plant_id'];
	let species = data['get_species'];
	let tank = data['get_tank_id'];
	let query = 'SELECT plant_id, species, tank_id FROM Plants WHERE plant_id LIKE \"%'+id+'%\" AND species LIKE \"%'+species+'%\" AND tank_id LIKE \"%'+tank+'%\";';
	let query2 = 'SELECT tank_id FROM Tanks ORDER BY tank_id ASC;';

	//query execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}

		db.pool.query(query2, function(error, rows2, fields2){
			if(error){
				console.log("Query Failure. Error Code: " + error.code);
				res.status(400);
				return;
			}
			res.status(200).render('plants', {Plants: rows, Tanks: rows2});
		});
	});
});

app.get('/pumps_filter', function(req, res){
	//Query Creation
	let data = req.query;
	let id = data['get_pump_id'];
	let flow = data['get_flow_rate'];
	let age = data['get_age'];
	let query = 'SELECT pump_id, flow_rate, age FROM Pumps WHERE pump_id LIKE \"%'+id+'%\" AND flow_rate LIKE \"%'+flow+'%\" AND age LIKE \"%'+age+'%\";';

	//query execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}
		res.status(200).render('pumps', {Pumps: rows});
	});
});

app.get('/tanks_filter', function(req, res){
	//Query Creation
	let data = req.query;
	let id = data['get_tank_id'];
	let volume = data['get_volume'];
	let pump = data['get_pump_id'];
	let query = 'SELECT tank_id, volume, pump_id FROM Tanks WHERE tank_id LIKE \"%'+id+'%\" AND volume LIKE \"%'+volume+'%\" AND pump_id LIKE \"%'+pump+'%\";';
	let query2 = 'SELECT pump_id FROM Pumps ORDER BY pump_id ASC;';

	//query execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			return;
		}

		db.pool.query(query2, function(error, rows2, fields2){
			if(error){
				console.log("Query Failure. Error Code: " + error.code);
				res.status(400);
				return;
			}
			res.status(200).render('tanks', {Tanks: rows, Pumps: rows2});
		});
	});
});

//Adding Data Routes
app.post('/input_fishes', function(req, res){
	//Query Creation
	let data = req.body;
	let species = data['set_species'];
	let age = data['set_age'];
	let tank = "NULL";
	if("" != data['set_tank_id']){
		tank = data['set_tank_id'];
	}
	let volume = data['set_volume_needed'];
	let query = 'INSERT INTO Fishes (species, age, tank_id, volume_needed) VALUES (\"'+species+'\", '+age+', '+tank+', '+volume+');';

	//Query Execution
	if(!(age.includes('-') || volume.includes('-'))){
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
	}
	else{
		res.status(200).redirect('/fishes');
	}
});

app.post('/input_feeds', function(req, res){
	//Query Creation
	let data = req.body;
	let name = data['set_name'];
	let stock = data['set_stock'];
	let query = 'INSERT INTO Feeds (name, stock) VALUES (\"'+name+'\", '+stock+');';

	//Query Execution
	if(!stock.includes('-')){
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
	}
	else{
		res.status(200).redirect('/feeds');
	}
});

app.post('/input_plants', function(req, res){
	//Query Creation
	let data = req.body;
	let species = data['set_species'];
	let tank = 'NULL'
	if("" != data['set_tank_id']){
		tank = data['set_tank_id'];
	}

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
	if(!(flow.includes('-') || age.includes('-'))){
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
	}
	else{
		res.status(200).redirect('/pumps');
	}
});

app.post('/input_tanks', function(req, res){
	//Query Creation
	let data = req.body;
	let volume = data['set_volume'];
	let pump = "NULL";
	if("" != data['set_pump_id']){
		pump = data['set_pump_id'];
	}
	let query = 'INSERT INTO Tanks (volume, pump_id) VALUES ('+volume+', '+pump+');';

	//Query Execution
	if(!volume.includes('-')){
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
	}
	else{
		res.status(200).redirect('/tanks');
	}
});

app.post('/input_ff', function(req, res){
	//Query Creation
	let data = req.body;
	let fish_id = data['fish_id'];
	let feed_id = data['feed_id'];
	let query = 'INSERT INTO Fish_Feeds (feed_id, fish_id) values (\"'+feed_id+'\", '+fish_id+');';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).redirect('/fish_feeds');
			return;
		}
		else{
			res.status(200).redirect('/fish_feeds');
		}
	});
});

app.post('/input_pp', function(req, res){
	//Query Creation
	let data = req.body;
	let plant_id = data['plant_id'];
	let pump_id = data['pump_id'];
	let query = 'INSERT INTO Plants_Pumps (plant_id, pump_id) values (\"'+plant_id+'\", '+pump_id+');';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).redirect('/plants_pumps');
			return;
		}
		else{
			res.status(200).redirect('/plants_pumps');
		}
	});
});

//Update Routes
app.put('/tanks/:id/:volume/:pump', function(req, res){
	//Data and query
	let id = req.params.id;
	let volume = req.params.volume;
	let pump = req.params.pump;
	let query = 'UPDATE Tanks SET volume = ' + volume + ', pump_id = ' + pump + ' WHERE tank_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.put('/fishes/:id/:species/:age/:tank/:volume', function(req, res){
	//Data and query
	let id = req.params.id;
	let species = req.params.species;
	let age = req.params.age;
	let tank = req.params.tank;
	let volume = req.params.volume;
	let query = 'UPDATE Fishes SET species = \"' + species + '\", age = ' + age + ', tank_id = ' + tank + ', volume_needed = ' + volume + ' WHERE fish_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.put('/feeds/:id/:name/:stock', function(req, res){
	//Data and query
	let id = req.params.id;
	let name = req.params.name;
	let stock = req.params.stock;
	let query = 'UPDATE Feeds SET name = \"' + name + '\", stock = ' + stock + ' WHERE feed_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.put('/plants/:id/:species/:tank', function(req, res){
	//Data and query
	let id = req.params.id;
	let species = req.params.species;
	let tank = req.params.tank;
	let query = 'UPDATE Plants SET species = \"' + species + '\", tank_id = ' + tank + ' WHERE plant_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.put('/pumps/:id/:flow/:age', function(req, res){
	//Data and query
	let id = req.params.id;
	let flow = req.params.flow;
	let age = req.params.age;
	let query = 'UPDATE Pumps SET flow_rate = ' + flow + ', age = ' + age + ' WHERE pump_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

//Deletion Routes
app.delete('/fishes/:id', function(req, res){
	//Data and for query
	let id = req.params.id;
	let query = 'DELETE FROM Fishes WHERE fish_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			res.end();
		}
		else{
			res.status(200).end();
		}
	});
});

app.delete('/feeds/:id', function(req, res){
	//Data and for query
	let id = req.params.id;
	let query = 'DELETE FROM Feeds WHERE feed_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.delete('/pumps/:id', function(req, res){
	//Data and for query
	let id = req.params.id;
	let query = 'DELETE FROM Pumps WHERE pump_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.delete('/plants/:id', function(req, res){
	//Data and for query
	let id = req.params.id;
	let query = 'DELETE FROM Plants WHERE plant_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.delete('/tanks/:id', function(req, res){
	//Data and for query
	let id = req.params.id;
	let query = 'DELETE FROM Tanks WHERE tank_id = ' + id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400);
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.delete('/delete_ff', function(req, res){
	//Data and for query
	let data = req.body;
	let fish_id = data['fish_id'];
	let feed_id = data['feed_id'];
	let query = 'DELETE FROM Fish_Feeds WHERE fish_id = ' + fish_id + ' And feed_id = ' + feed_id + ';';

	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).end();
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.delete('/delete_pp', function(req, res){
	//Data and for query
	let data = req.body;
	let plant_id = data['plant_id'];
	let pump_id = data['pump_id'];
	let query = 'DELETE FROM Plants_Pumps WHERE plant_id = ' + plant_id + ' And pump_id = ' + pump_id + ';';
	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).end();
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.put('/update_ff', function(req, res){
	//Data and for query
	let data = req.body;
	let fish_id = data['fish_id'];
	let feed_id = data['feed_id'];
	let old_fish_id = data['old_fish_id'];
	let old_feed_id = data['old_feed_id'];
	let query = 'UPDATE Fish_Feeds SET feed_id = ' + feed_id + ', fish_id = ' + fish_id + ' WHERE feed_id = ' + old_feed_id + ' AND fish_id = ' + old_fish_id +';';
	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).end();
			return;
		}
		else{
			res.status(200).end();
		}
	});
});

app.put('/update_pp', function(req, res){
	//Data and for query
	let data = req.body;
	let plant_id = data['plant_id'];
	let pump_id = data['pump_id'];
	let old_plant_id = data['old_plant_id'];
	let old_pump_id = data['old_pump_id'];
	let query = 'UPDATE Plants_Pumps SET plant_id = ' + plant_id + ', pump_id = ' + pump_id + ' WHERE plant_id = ' + old_plant_id + ' AND pump_id = ' + old_pump_id +';';
	//Query Execution
	db.pool.query(query, function(error, rows, fields){
		if(error){
			console.log("Query Failure. Error Code: " + error.code);
			res.status(400).end();
			return;
		}
		else{
			res.status(200).end();
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