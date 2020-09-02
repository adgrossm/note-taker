var path = require('path')

module.exports = function (app) {
    app.get('/notes', function (req, res) {
        //  should send to notes page
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function (req, res) {
        // should send to home page or index.html
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}