const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the app
var app = express();
var port = process.env.PORT || 3000;


// Middleware
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());



// * GET `*` - Should return the `index.html` file
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", (err, data) => {
        if (data) {
            res.json(JSON.parse(data));
        } else {
            res.send("No notes in storage.");
        }
    });
});


app.post("/api/notes", function (req, res) {
    var currentDb = JSON.parse(fs.readFileSync("db/db.json")) || [];
    var newNote = req.body;
    let randomID = new Date();
    newNote["id"] = randomID.getTime();
    var updatedNotes = currentDb;
    updatedNotes.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(updatedNotes));
    res.send(console.log("new note saved"));
});


app.delete("/api/notes/:id", function (req, res) {
    res.send(console.log("req", req));
    var currentDb = JSON.parse(fs.readFileSync("db/db.json")) || [];
    var newNotes = [];
    res.send(console.log("newnotes:", newNotes));
    for (let i = 0; i < currentDb.length; i++) {
        if (currentDb[i].id !== parseInt(req.params.id)) {
            newNotes.push(currentDb[i]);
            res.send(console.log("if entered", newNotes));
        }
    }
    overwriteNotes(newNotes);
    res.send(console.log("deleted note"));
})

function overwriteNotes(newNotes) {
    fs.writeFileSync("./db/db.json", JSON.stringify(newNotes));
}
app.listen(port, () => console.log(`listening on localhost: ${port}`));