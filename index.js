var express = require('express')
var model = require('./model.js')
var controller = require('./controller.js')
var hexdec = require('./hexdec.js')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()

// Use the ejs templating engine
app.set('view engine', 'ejs');

// Static files (html/css/js)
app.use(express.static(path.join(__dirname, 'views')));

// Define the port to run on
app.set('port', process.env.PORT || 3000);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Home Page
app.get('/', function (req, res) {
 	res.render('html/index')
})

// Data Page
app.get('/data',function(req, res){
	res.render('data.ejs')
})

// Pace Page

// Record Page

// Testing HexDec function
app.post('/dec',function(req,res){
	inthex= req.body.hex;
	console.log(req.body.hex)
	hexdec.dec(inthex,function(err, decstring){
		if(err)
		{
			console.log(err)
		}
		console.log(decstring);
		res.send('Hello');
	})
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

// Route Queries for Heart Parameters
app.get('/getparams', function(req, res){
	controller.get_heart_params(function(err,params){
		if(err)
		{
			console.log(err);
		}
		else{
      console.log("Successfully Queried Parameters");
      console.log(params);
			res.send(params);
		}
	});
})

app.post('/setparams', function(req, res){
  console.log(req.body);
	controller.post_heart_params(req.body, function(err,params){
		if(err)
		{
			console.log(err);
		}
		else{
      console.log("Successfully Updated Parameters");
      console.log(params);
			res.send(params);
		}
	});
})

// Send Fake Test Data
app.post('/heartdata', function(req, res){
  console.log(req.body);
  console.log(req.body.string);
  console.log(req.body.channel);
	controller.heart_data(req.body.string,req.body.channel,function(err,heartdata){
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
