var config = require('./config.js');
var db = require('orchestrate')(config.dbKey)


// db.put('test', 'nate', {
// 	"home_location": "Troutdale",
// 	"work_location": "Portland",
// 	"residing_state": "Oregon"
// })
// .then(function(res){
// 	console.log(res.statusCode);
// })
// .fail(function(err){});

// db.get('test', 'nate')
// .then(function(res){
// 	console.log(res.body);
// })
// .fail(function(err){});

db.get('test', 'home_location').then(function(result){console.log(result);}).fail(function(err){console.log(err);})

// db.search('test', 'value.work_location: "Portland"')
// .then(function(res){
// 	console.log(res.body);
// })
// .fail(function(err){})

// db.list('test', {limit:10, startKey:'n'}).then(function(result){
// 	console.log(result);
// }).fail(function(err){console.log(err);});

// db.ping().then(function(){console.log("working");}).fail(function(err){console.log(err);})