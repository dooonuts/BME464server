var mysql = require('mysql');
var exports = module.exports;
var connection;

exports.connect =  function(callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  connection.connect(function(err) {
    if (err)
    {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log('connected as id ' + connection.threadId);
  });

  connection.end(function(err){
    if(err)
    {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log('Ended connection');
  });
  callback(null);
}

exports.heart_data = function(heart_string, callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  var heartdata = {
    data : heart_string,
    time : (new Date()).toJSON(),
    channel : 'LA'
  }

  connection.query("INSERT INTO testdata SET ?", [heartdata], function(err, result){
    if(err) {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log("Inserted :" + result);
    console.log("Inserted Fake Information");
  });

  callback(null,heartdata);
}
