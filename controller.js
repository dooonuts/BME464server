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

exports.get_heart_params = function(callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  var heartparams = {
    start_pace: 0,
    stop_pace: 0,
    start_record: 0
  }

  connection.query("SELECT * FROM params", function(err, results, fields){
    if(err) {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }

    console.log("Queried for Heart Parameters!");

    connection.query("UPDATE params SET ?", [heartparams], function(err, result){
      if(err) {
        console.log('err');
        console.error('error connecting: ' + err.stack);
        callback(err);
      }
      console.log("Updated Parameters: " + heartparams);

      connection.end(function(err){
        if(err)
        {
          console.log(err);
          console.error('error connecting: ' + err.stack);
        }
        console.log('Ended connection');
        callback(null,results);
      });
    });
  });
}

exports.post_heart_params = function(params,callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  var heartparams = {
    pace_channel: params.pace_channel,
    pace_time_duration: params.pace_time_duration,
    pulse_width_duration: params.pulse_width_duration,
    pulse_amplitude: params.pulse_amplitude,
    record_duration: params.record_duration,
  }

  connection.query("UPDATE params SET ?", [heartparams], function(err, result){
    if(err) {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log("Updated Parameters: " + heartparams);
  });

  connection.end(function(err){
    if(err)
    {
      console.log(err);
      console.error('error connecting: ' + err.stack);
    }
    console.log('Ended connection');
  });
  callback(null,heartparams);
}

exports.heart_data = function(heart_string, heart_channel, callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  var heartdata = {
    data : heart_string,
    time : new Date(),
    channel : heart_channel
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

  connection.end(function(err){
    if(err)
    {
      console.log(err);
      console.error('error connecting: ' + err.stack);
    }
    console.log('Ended connection');
  });
  callback(null,heartdata);
}

exports.retreive_last_five = function(callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  connection.query("SELECT * FROM testdata ORDER BY event_id DESC limit 5", function(err, results, fields){
    if(err) {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log("Retrieved:" + results);

    connection.end(function(err){
      if(err)
      {
        console.log(err);
        console.error('error connecting: ' + err.stack);
      }
      console.log('Ended connection');
    });
    callback(null,results);
  });
}

exports.retreive_data_by_id = function(event_id, callback){
  var connection = mysql.createConnection({
    host     : 'bme464.csqomiwkjysg.us-east-1.rds.amazonaws.com',
    port     : '3306',
    user     : 'wolf',
    password : 'dUk3bme*',
    database : 'heart_data'
  });

  connection.query("SELECT * FROM testdata WHERE event_id = ?", [event_id], function(err, results, fields){
    if(err) {
      console.log('err');
      console.error('error connecting: ' + err.stack);
      callback(err);
    }
    console.log("Retrieved:" + results);

    connection.end(function(err){
      if(err)
      {
        console.log(err);
        console.error('error connecting: ' + err.stack);
      }
      console.log('Ended connection');
    });
    callback(null,results);
  });
}
