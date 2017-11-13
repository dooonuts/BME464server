var express = require('express')
var model = require('./model.js')
var controller = require('./controller.js')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()

// Static files (html/css/js)
app.use(express.static(path.join(__dirname, 'public')));

// Define the port to run on
app.set('port', process.env.PORT || 3000);

// Create application/json parser
var jsonParser = bodyParser.json();

// Home Page
app.get('/', function (req, res) {
 	res.send('Hello Chris!')
})

// Route Simply Contains a variable that sees how many times this is targeted
app.get('/target', function (req, res) {
	res.send('Target!')
})

// Route Establishes New Database
app.get('/air', function(req, res){
  console.log("Here");
	controller.connect(function(err){
    if(err)
    {
      console.log(err);
    }
    else{
      console.log("Successfully Connected");
      res.send('Hi!');
    };
  });
})

// Send Fake Test Data
app.get('/heart', function(req, res){
	controller.heart_data(function(err,heartdata){
		if(err)
		{
			console.log(err);
		}
		else{
      console.log("Successfully Connected to Heart");
      console.log(heartdata);
			res.send('Hey There!');
		}
	});
})

// Send Fake Test Data
app.post('/heartdata',  jsonParser, function(req, res){
  console.log(req.body);
	controller.heart_data(req.body,function(err,heartdata){
		if(err)
		{
			console.log(err);
		}
		else{
      console.log("Successfully Connected to Heart");
      console.log(heartdata);
			res.send('Hey There!');
		}
	});
})

// Listen for requests
app.listen(app.get('port'), function () {
	console.log('Sensor Website listening on port 3000!');
})
