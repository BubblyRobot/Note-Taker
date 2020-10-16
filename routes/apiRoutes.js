const db = require("../db/db.json");
const fs = require("fs");
const path = require('path');
const util = require("util");

console.log('Current Dir: ' + __dirname);

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        // res.json(db);
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", function (req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        console.log(savedNotes);
        let newNote = req.body;
        //using note position in arr length # as unique id
        // let uniqueID = (savedNotes.length).toString();
        let uniqueID = (savedNotes.length);
        console.log('setting newNotes id to ' + uniqueID);
        newNote.id = uniqueID;
        savedNotes.push(newNote);

        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        console.log("Note saved to db.json: ", newNote);
        res.json(savedNotes);
    })

    app.delete("/api/notes/:id", function (req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let noteID = req.params.id;
        let newID = 0;
        console.log(`Deleting note with ID ${noteID}`);
        savedNotes = savedNotes.filter(currentNote => {
            return currentNote.id != noteID;
        })

        for (currentNote of savedNotes) {
            currentNote.id = newID.toString();
            newID++;
        }

        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        res.json(savedNotes);
    })

}