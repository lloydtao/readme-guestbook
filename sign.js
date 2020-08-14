const editJsonFile = require("edit-json-file");

let sign = function (user, message) {
  return new Promise((resolve) => {
      // Create the guestbook if it doesn't exist.
      let file = editJsonFile(`${__dirname}/guestbook.json`);
      file.save();
      
      // Reload it from the disk.
      file = editJsonFile(`${__dirname}/guestbook.json`, {
          autosave: true
      });
      
      // Add to the guestbook.
      file.set("a.new.field.as.object", {
          user: user,
		  message: message,
      });
	  
	  // Output the guestbook.
      console.log(file.toObject());
  });
};

module.exports = sign;
