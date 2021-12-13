const News = require("../Models/news.models");

exports.createNews = (req, res) => {
  const newNews = new News(req.body);
  newNews.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(newNews);
  })
}

exports.eraseNews = (req, res) => {
  News.deleteMany().then(function(){
    res.json({ message: "Data deleted"});
  })
}

exports.listNews = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";

  News.find()
    .populate("author")
    .sort([[sortBy, order]])
    .exec((err, News) => {
      if (err) {
        return res.status(400).json({
          error: "Autores no encontrados",
        });
      }
      res.json(News);
    });
}