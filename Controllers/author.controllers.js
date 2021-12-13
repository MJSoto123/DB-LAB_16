const Author = require("../Models/author.models");

exports.createAuthor = (req, res) => {
  const newAuthor = new Author(req.body);
  newAuthor.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json(newAuthor);
  })
}

exports.eraseAuthors = (req, res) => {
  Author.deleteMany().then(function(){
    res.json({ message: "Data deleted"});
  })
}

exports.listAuthors = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";

  Author.find()
    .sort([[sortBy, order]])
    .exec((err, authors) => {
      if (err) {
        return res.status(400).json({
          error: "Autores no encontrados",
        });
      }
      res.json(authors);
    });
}
