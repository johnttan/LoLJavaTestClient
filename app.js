
var express = require('express');
var app = express();
app.set('port', 8080);
app.set("view options", {layout: false});
app.set('views', __dirname + '/public');
var util = require('util');
var fs = require('fs');
var exec = require('child_process').exec, client1;
var path = require('path');
var spawn = require('child_process').spawn;

//Information for login.
var login = {
	username: 'usernamehere'
	password: 'passwordhere'
	version: '3.15.13_12_13_16_07'
	server: 'NA'
}
var command = 'java -jar ' + __dirname + '/build/lolclient1.jar' + ' ' + login.username + ' '+ login.password+ ' ' + version;
var command1 = 'java';
var args = ['-jar', __dirname + '/build/lolclient1.jar', login.username, login.password, login.server, login.version]

client1 = spawn(command1, args);

/*
client1 = exec(command,
	function(error, stdout, stderr) {
	console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
	}})
*/
var logStream = fs.createWriteStream('./logFile.log', {flags: 'a'});

client1.stdout.pipe(logStream);
client1.stderr.pipe(process.stdout);
client1.setEncoding = 'utf-8';
client1.stdout.setMaxListeners(0);

//currently responds with preset summoner data
app.get('/REST/:summonername', function(req, res){
	console.log('Request received from: ' + req.ip);
	client1.stdin.write("playerStatsService getAggregatedStats " + '34020413 CLASSIC 3\n') //hard-coded summoner ID for testing.
	console.log('Waiting for response')

	client1.stdout.once('data', function(data){
	console.log('Response sent')

	res.send(JSON.stringify(data));
	

	})
	
	

})








app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));