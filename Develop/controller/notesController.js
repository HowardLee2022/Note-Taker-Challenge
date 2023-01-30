const express = require('express');
const router = express.Router();
const fs = require("fs")


router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const notes = JSON.parse(data);
        console.log("here the notes")
        console.log(notes)
        res.json(notes);
      }
    });;
  });

  module.exports = router;