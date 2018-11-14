var fs = require('fs');
var path = require('path');

var filter = {
	extension: process.argv[2],
	contains: process.argv[3]
};

if (filter.extension == null || filter.contains == null) console.log('USAGE: node search.js [EXT] [TEXT]');
else {
	var files = getFiles(__dirname, filter); 
	
	if (files.length > 0) console.log( files.join('\n') );
	else console.log('No file was found');
}


function getFiles(dir, filter) {
	var files = [];
	var list = fs.readdirSync(dir);
	
	list.forEach(fileName => {
		var file = path.resolve(dir, fileName); 
		var isDir = fs.lstatSync(file).isDirectory(); 
		
		if (isDir) files = files.concat( getFiles(file, filter) ); 
		else {
			if (path.basename(file).split('.')[1] === filter.extension) {
				var content = fs.readFileSync(file, 'utf8');
				
				if (content.indexOf(filter.contains) !== -1) files.push(file);
			}
		}
	});
	
	return files;
}