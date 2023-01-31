const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static("public"));


// this routes to the controller folder
const allRoutes = require("./controller");
app.use("/", allRoutes);

// listens on port 3000
app.listen(PORT, function() {
    console.log("listenin on port " + PORT);
  });
  
 


