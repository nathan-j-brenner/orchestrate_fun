var config = require('./config.js');
var db = require('orchestrate')(config.dbKey)
var fs = require('fs');

//read each file and store the contents of each file in a collection
var store_content_in_orchestrate_collection = function(i){
		fs.readFile('../pride-and-prejudice/chapter-' + i, {encoding: 'utf8'}, function(err, data){
			if(err) throw err;
			db.put('pride_and_prejudice', 'chapter-'+i, {
				'chapter_number': i,
				'contents': data
			})
			.then(function(result){})
			.fail(function(err){})
		});
	return store_content_in_orchestrate_collection;
}
// store_content_in_orchestrate_collection();
function store_all_chapters_content(){
	var chapterName;
	for(var i = 1; i<10;i++){
		var j = '0'+ i;
		store_content_in_orchestrate_collection(j)
	}
	for(var i = 10; i<=61; i++){
		store_content_in_orchestrate_collection(i);
	}
}

function findNerves(chapter){
	// var nerves_array
	// console.log(str.match('/nerves/g').length);
	return chapter.match(/nerves/g).length
}

db.search('pride_and_prejudice', 'value.contents: "nerves*"')
.then(function(result){
	var chapterText;
	var nerveOccurs = {};
	var chapterArray = result.body.results; 
	for(chapterCount = 0;chapterCount<chapterArray.length;chapterCount++){
		chapterText = chapterArray[chapterCount].value.contents;
		var chapterNumber = chapterArray[chapterCount].value.chapter_number;
		var count = findNerves(chapterText);
		nerveOccurs[chapterNumber]= count;
	}
	console.log(nerveOccurs);
}).fail(function(err){console.log('error');})




// db.search('pride_and_prejudice', 'value.contents: "Mary" NOT "Lydia"')


