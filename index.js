const core = require('@actions/core');
const sign = require('./sign');
const fs = require('fs');
const readline = require('readline');


async function run() {
  try {
    /// Get inputs.
    core.info('Getting input variables...');
    const path = core.getInput('path');
    const user = core.getInput('user');
    const message = core.getInput('message');

    /// Add signature to guestbook.
    core.info(`Signing under \"${user}\", with message \"${message}\"...`);
    sign(path, user, message);
    
	core.info("Creating table from guestbook...");
    /// Generate table from new guestbook.
    // Set up table.
    var table = [];
    var guestbook = JSON.parse(JSON.stringify(require(path + "/guestbook.json")));
    
    table.push("\r\r");
    table.push("| User | Message |");
	table.push("\r");
    table.push("| ---- | ------- |");
	table.push("\r");
    for(var i = 0; i < Object.keys(guestbook.signatures).length; i++) {
        var guestbookUser = Object.keys(guestbook.signatures)[i];
        var guestbookMessage = guestbook.signatures[guestbookUser].message;
        table.push("| " + guestbookUser + " | " + guestbookMessage + " |");
	    table.push("\r");
    }
    
	core.info("Loading current README...");
    /// Prepare README
    // Read current README into array.
    var readme = []; 
	var fs = require('fs');
    var array = fs.readFileSync(path + "/README.md").toString().split("\r");
    for(i in array) {
        readme.push(array[i]);
    }
    
    // Find start and end points.
    var startString = "<!-- start readme guestbook SsvfkAhv -->";
    var start = readme.findIndex(element => element.includes(startString));
    
    var endString = "<!-- end readme guestbook SsvfkAhv -->";
    var end = readme.findIndex(element => element.includes(endString));
    
	core.info("Inserting guestbook into README...");
    /// Render README.
    // Create new readme by splicing.
    var output = readme.slice(0, start + 1).concat(table).concat(readme.slice(end));
	
	core.info("Inserting guestbook into README...");
	// Save array as README.
	fs.writeFile(path + "/README.md", output.join(' '), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
    });
    
    /// Complete action.
    core.info((new Date()).toTimeString());
    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    /// Log the error.
    core.setFailed(error.message);
  }
}

run();
