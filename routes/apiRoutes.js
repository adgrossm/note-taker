var fs = require('fs')
var path = require('path')
var DB_PATH = path.join(__dirname, '../db/db.json')

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

    // do we swap the api/characters for ./index or notes.html
    app.post('/api/notes', function (req, res) {
        var notes = getNotes()
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware

        // can we push the var from index.js of 
        var newcharacter = req.body;
        // console.log(newcharacter);
        //   how to create a new character ID so it creates the ID once it gets pushed to db.json array
        //   UUID  there is a npm package for that to create a unique ID  have to google.
        // We then add the json the user sent to the character array
        notes.push(newcharacter);

        //   important
        saveNotes(notes);

        // We then display the JSON to the users
        res.sendStatus(200)
    });


    app.delete("/api/notes/:id", function (req, res) {
        const id = parseInt(req.params.id);

        var notes = getNotes();

        notes = notes.filter(note => note.id !== id);
        saveNotes(notes);
        
        // const newNotes = []
        // for (var i = 0; i < notes.length; i++) {
        //     if(notes[i].id === id) {
        //         newNotes.push(notes[i])
        //     }
        // }
        // saveNotes(newNotes);

        res.sendStatus(200);
    })
    //   need to use splice for the array of the db.json file to delete a note, so it will have a index. once
    // the file gets deleted we will need to read then write the saved notes.
    // ***************change all instances of characters with notes 
}