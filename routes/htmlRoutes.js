var path = require("path");

module.exports = function (app) {
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("/index", (req, res) => {
        // res.sendFile(path.join(__dirname, "../Note-Taker-Express/Develop/public/index.html"));
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};

