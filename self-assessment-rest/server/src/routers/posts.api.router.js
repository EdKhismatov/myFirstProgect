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
  const response = await Post.create({ post, user_id, img, title });
  res.json(response);
});

// удаляем пользователя
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

// узнаем хозяина поста

router.get('/tweets/:post_id/users', async (req, res) => {
  try {
    const { post_id } = req.params;
    const twet = await Post.findByPk(post_id);
    const users = await User.findAll();
    const result = twet.dataValues.user_id;
    const finish = users.find((el) => el.id === result);
    res.status(200).json(finish);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});


module.exports = router;
