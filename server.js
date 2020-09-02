// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json")
// not sure why I created the var below for index

// var index = require("./assets/js/index")
// do we need to require var index = require("./index")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Routes
// =============================================================
function saveNotes() {
    fs.writeFile("./db/db.json", JSON.stringify(characters, null, 2), (err) => {
        if (err) throw err;
    });
    }

// Basic route that sends the user first to the AJAX Page
// 
app.get("*", function(req, res) {
    // should send to home page or index.html
    res.sendFile(path.join(__dirname, "/index.html"));
  });


app.get('/notes', function(req, res) {
//  should send to notes page
    res.sendFile(path.join(__dirname, "/notes.html"));
  });
// do we swap the api/characters for ./index or notes.html
app.post('/notes', function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware

    // can we push the var from index.js of 
    var newcharacter = req.body;
    // console.log(newcharacter);
//   how to create a new character ID so it creates the ID once it gets pushed to db.json array
//   UUID  there is a npm package for that to create a unique ID  have to google.
    // We then add the json the user sent to the character array
    characters.push(newcharacter);
  
    //   important
    console.log(newcharacter)
    saveNotes();
    // We then display the JSON to the users
    res.json(newcharacter);
  });


  app.delete("/api/notes/:id", function (req, res){
      const id = req.params.id;

      for (let i = 0; i < characters.length; i++){
       if (characters[i] === id) {
           characters.splice(i);
       }  
       saveNotes();
      }
  })
//   need to use splice for the array of the db.json file to delete a note, so it will have a index. once
// the file gets deleted we will need to read then write the saved notes.
// ***************change all instances of characters with notes

var characters ;
// could we swap "db.json" just db for the var we declared with the path to bd.json

fs.readFile("./db/db.json", "utf8", (err, data)=> {
    
        if (err) throw err;

characters =  JSON.parse(data);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  