const router = require('express').Router();
const { Todo, User, Post, Like } = require('../../db/models');


router.get('/', async (req, res) => {
    const response = await Post.findAll();
    res.json(response);
  });

module.exports = router;