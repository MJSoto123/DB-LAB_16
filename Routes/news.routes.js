const express = require("express");
const News = require("../Models/news.models")
const router = express.Router();
const {
  createNews,
  eraseNews,
  listNews,
  lobby,
} = require("../Controllers/news.controllers");

router.post("/createnews", createNews);
router.get("/erasenews", eraseNews);
router.get("/listnews", listNews);
router.get("/", function (req, res, next) {
  News.find().populate("author").exec((err, docs) => {
    if (!err) {
      res.render("../Views/index", {
        data: docs,
      });
    } else {
      console.log("Failed to retrieve the News List: " + err);
    }
  });
});
module.exports = router;
