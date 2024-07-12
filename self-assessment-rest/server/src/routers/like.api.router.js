const router = require('express').Router();
const { Todo, User, Post, Like } = require('../../db/models');

// возвращает лайкнутые твиты пользователя
router.get('/users/:user_id/likes/tweets', async (req, res) => {
  try {
    const { user_id } = req.params;
    const likes = await Like.findAll({ where: { user_id } });
    const id = likes.map((el) => el.post_id);
    const likedTweets = await Post.findAll({ where: { id } });
    res.json(likedTweets);
  } catch (error) {
    console.error('Error fetching liked tweets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// возвращает пользователей, лайкнувших твит
router.get('/tweets/:post_id/likes/users', async (req, res) => {
  try {
    const { post_id } = req.params;
    const tweet = await Like.findAll({ where: { post_id } });
    const id = tweet.map((el) => el.user_id); // [10,13,8]
    const likedTweets = await User.findAll({ where: { id } });
    res.json(likedTweets);
  } catch (error) {
    console.error('Error fetching liked tweets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// удаление и добавления лайков
router.post('/tweets/:post_id/users/:user_id/likes', async (req, res) => {
  try {
    const { user_id, post_id } = req.params;
    const like = await Like.findOne({ where: { user_id, post_id } });
    if (like) {
      await like.destroy({ user_id, post_id });
      res.status(200).send('Удалилось');
    } else {
      await Like.create({ user_id, post_id });
      res.status(201).send('coздалось');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});



// удаление поста если у него есть лайк

router.delete('/tweets/:post_id/:user_id/likes', async (req, res) => {
  try {
    const { user_id, post_id } = req.params;
    console.log(user_id, post_id, 'так так')
    const like = await Like.findOne({ where: { user_id, post_id } });
    if (like) {
      await like.destroy({ user_id, post_id });
      res.status(200).send('Удалилось');
    } else {
      res.status(200).send('ok');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
