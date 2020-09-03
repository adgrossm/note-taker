var fs = require('fs')
var path = require('path')
var DB_PATH = path.join(__dirname, '../db/db.json')
var uniqueID = require("uniqid");
/**
 * 
 * @param {any[]} notes Array of note objects!
 */
var saveNotes = notes => fs.writeFileSync(DB_PATH, JSON.stringify(notes))

/**
 * @returns {any[]}
 */
var getNotes = () => JSON.parse(fs.readFileSync(DB_PATH))

module.exports = function (app) {

    app.get('/api/notes', function (req, res) {
        var notes = getNotes()

        res.json(notes)
    })

    app.post('/api/notes', function (req, res) {
        var notes = getNotes()
        
        var newcharacter = req.body;
        // console.log(newcharacter);
        newcharacter.id = uniqueID("");

        notes.push(newcharacter);

        //   important
        saveNotes(notes);

        // We then display the JSON to the users
        res.json(notes)
        
    });

    // app.post("/api/notes/:id", function (req, res) {
    //     // const id = parseInt(req.params.id);
        
    //     var notes = getNotes();
    //     notes = notes.filter(note => note.id !== id);
       
    //     // getNotes(notes)
      
    //     // renderActiveNote(notes.id);
        

    //     // We then display the JSON to the users
    //     res.sendStatus(200)
    // })
    app.delete("/api/notes/:id", function (req, res) {
        const userId = req.params.id;

        var notes = getNotes();

        notes = notes.filter(note => note.id !== userId);
        saveNotes(notes);
        
        // const newNotes = []
        // for (var i = 0; i < notes.length; i++) {
        //     if(notes[i].id === id) {
        //         newNotes.push(notes[i])
        //     }
        // }
        // saveNotes(newNotes);

        res.json(notes)
    })
 
}