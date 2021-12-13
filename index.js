const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());


const mongoAtlasUri = "mongodb://<user>:<password>@clausula-shard-00-00.1udxf.mongodb.net:27017,clausula-shard-00-01.1udxf.mongodb.net:27017,clausula-shard-00-02.1udxf.mongodb.net:27017/lab-16?ssl=true&replicaSet=atlas-crp59f-shard-0&authSource=admin&retryWrites=true&w=majority"

try {
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true }, { ssl:true },
    () => console.log(" Mongoose is connected"),
  );
} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.set("port", process.env.PORT || 3002);

app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/Public'));
app.use(require(__dirname + "/Routes/news.routes"));
app.use(require(__dirname + "/Routes/author.routes"));
