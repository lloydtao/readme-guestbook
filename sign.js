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
      path = "guestbook.signature." + user
      file.set(path, {
          message: message,
      });
      
      // Output and save the guestbook.
      console.log(`${__dirname}/guestbook.json`);
      console.log(file.toObject());
      file.save();
  });
};

module.exports = sign;
