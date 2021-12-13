const express = require('express');
const router = express.Router();
const { createAuthor, eraseAuthors, listAuthors } = require('../Controllers/author.controllers');

router.post("/createauthor", createAuthor);
router.get("/eraseauthors", eraseAuthors);
router.get("/listauthors", listAuthors);

module.exports = router;