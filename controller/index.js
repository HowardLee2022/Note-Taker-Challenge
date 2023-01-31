const express = require('express');
const router = express.Router();
const path = require("path");


// display the index.html file when they visit the home page which is localhost:3000
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
// display the note.html file when they visit localhost:3000/notes
router.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "../public/notes.html"));
});
// controller for all the notes file path
const noteRoutes = require("./notesController");
router.use("/api/notes",noteRoutes)
  
  

module.exports = router;