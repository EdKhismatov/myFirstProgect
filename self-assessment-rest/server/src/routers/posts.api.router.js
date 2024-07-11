const router = require('express').Router();
const { Todo, User, Post, Like } = require('../../db/models');

// все посты с определенным пользователем

router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const response = await Post.findAll({ where: { user_id } });
  res.json(response);
});

// создает пользователя
router.post('/', async (req, res) => {
  const { post, user_id, img, title } = req.body;
  console.log(img,' sadasdasd')
  const response = await Post.create({ post, user_id, img, title });
  res.json(response);
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id } });
    res.status(200).send('Запись успешно удалена');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
