const express = require('express');
const router = express.Router();
const fs = require("fs")

// this is a package that generates a random ID
const generateID = require("generate-unique-id");

// This reads the file db.son and returns the data.
router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });;
  });

  //this reads db.json and then creates a new array called notes. Then it will create a newNote that will save the title, text and generates a random id. Then it will append the newNote to the notes.
  //It will then rewrite the db.json file with the Notes array.
  router.post("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const notes = JSON.parse(data);
        const newNote ={
          title: req.body.title,
          text: req.body.text,
          id: generateID()
        }
        notes.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (err) => {
          if (err) {
            res.status(500).send("oh no!");
            throw err;
          } else {
            res.send("data added!");
          }
        });
      }
    });
  });

  //This reads the db.json file and copy the array object into notes. then it will filter through notes array to check if the id thats referencing matches any of the excisting object in the notes array. If it matches it will not add it back to the notes.
  // Then it will rewrite the db.json file and since the matching id didnt get added back to the notes array it gets deleted.
  router.delete("/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        let notes = JSON.parse(data);
        notes = notes.filter((notes1) => {
          if (notes1.id == req.params.id) {
            return false;
          } else {
            return true;
          }
        });
        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (err) => {
          if (err) {
            res.status(500).send("oh no!");
            throw err;
          } else {
            res.send("data deleted!");
          }
        });
      }
    });
  });



  module.exports = router;