const editJsonFile = require("edit-json-file");

let sign = function (path, user, message) {
  return new Promise((resolve) => {
      // Create the guestbook if it doesn't exist.
	  filepath = path + "/guestbook.json";
      let file = editJsonFile(filepath);
      file.save();
      
      // Reload it from the disk.
      file = editJsonFile(filepath, {
          autosave: true
      });
      
      // Add to the guestbook.
      jsonpath = "signatures." + user;
      file.set(jsonpath, {
          message: message,
      });
      
      // Output and save the guestbook.
      console.log(filepath);
      console.log(file.toObject());
  });
};

module.exports = sign;
