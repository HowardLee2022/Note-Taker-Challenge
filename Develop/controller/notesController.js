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

    
  router.post("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("oh no!");
        throw err;
      } else {
        const notes = JSON.parse(data);
        notes.push(req.body);
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