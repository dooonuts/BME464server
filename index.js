var express = require('express')
var model = require('./model.js')
var controller = require('./controller.js')
var hexdec = require('./hexdec.js')
var bodyParser = require('body-parser')
var dateformat = require('dateformat')
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
  controller.retreive_last_five(function(err, results){
    if(err)
    {
      console.log(err);
    }
    console.log("Retrieved Last Five" + results);
     var time = [];
     var link = [];
     var length = [];
     for(var i = 0;i< results.length;i=i+1){
       time[i] = dateformat(results[i].time, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
       link[i] = "/data/" + results[i].event_id;
       length[i] = results[i].data.length/4
     }
    res.render('html/data', {
      results:results,
      time:time,
      link:link,
      packet_size:length
    });
  })
})

// Charts for each set of data
app.get('/data/:id', function(req,res){
  console.log(req.params.id);
  var id = req.params.id;
  controller.retreive_data_by_id(id, function(err, results){
    if(err){
      console.log(err);
    }
    console.log("Retrieved: " + results);
    res.send(results);
  })
})

// Initialization Page
app.get('/init',function(req, res){
	res.render('html/init')
})

// Pace Page
app.get('/pace',function(req, res){
	res.render('html/pace')
})

// Record Page
app.get('/record',function(req, res){
	res.render('html/record')
})

// Testing Retrieving Last 5
app.get('/test_last_five', function(req, res){
    controller.retreive_last_five(function(err, results){
      if(err)
      {
        console.log(err);
      }
      console.log("Retrieved Last Five" + results);
      var time = [];
      var data = [];
      for(var i = 0;i< results.length;i=i+1){
        time[i] = results[i].time;
        data[i] = results[i].data;
      }
      // Use Array.concat to concatenate the strings of data
      for(var j = 0; j< data.length;j=j+1){
        hexdec.dec(data[j],function(err, decstring, decarray){
      		if(err)
      		{
      			console.log(err);
      		}
      		console.log("Printing Decimal String: " + decstring);
          console.log("Printing Decimal Array: " + decarray);
      	})
      }
      res.send('Finished conversion from Hex to Decimal');
    })
})

// Testing HexDec function
app.post('/dec',function(req,res){
	inthex= req.body.hex;
	console.log(req.body.hex);
	hexdec.dec(inthex,function(err, decstring, decarray){
		if(err)
		{
			console.log(err)
		}
		console.log("Printing Decimal String: " + decstring);
    console.log("Printing Hex String: " + decstring);
		res.send('Finished conversion from Hex to Decimal');
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

// Set the Parameters
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

// Send Real Data
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
			res.send('Heart Data Stored');
		}
	});
})

// Listen for requests
app.listen(app.get('port'), function () {
	console.log('Sensor Website listening on port 3000!');
})
