require('dotenv').config();
const cors = require('cors');
const apiRouter = require('./routers/api.router');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { Todo, User, Post, Like,  } = require('../db/models');
const express = require('express');

const app = express();
const { PORT } = process.env;

const corsConfig = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));

app.use('/api/v1', apiRouter);



// возвращает лайкнутые твиты пользователя
// app.get('/users/:user_id/likes/tweets', async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const likes = await Like.findAll({ where: { user_id } });
//     const id = likes.map((el) => el.post_id); // [10,13,8]
//     const likedTweets = await Post.findAll({ where: { id } });
//     res.json(likedTweets);
//   } catch (error) {
//     console.error('Error fetching liked tweets:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// возвращает пользователей, лайкнувших твит
// app.get('/tweets/:post_id/likes/users', async (req, res) => {
//   try {
//     const { post_id } = req.params;
  
//     const tweet = await Like.findAll({ where: { post_id } });
//     const id = tweet.map((el) => el.user_id); // [10,13,8]
//     const likedTweets = await User.findAll({ where: { id } });
//     res.json(likedTweets);
//   } catch (error) {
//     console.error('Error fetching liked tweets:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// удаление и добавления лайков
// app.get('/tweets/:post_id/users/:user_id/likes', async (req, res) => {
//   try {
//     const { user_id, post_id } = req.params;
//     console.log(user_id, post_id, 'asdasda' )
//     const like = await Like.findOne({ where: { user_id, post_id } });
//     if (like) {
//       await like.destroy({ user_id, post_id });
//       res.status(200).send('Удалилось');
//     } else {
//       await Like.create({ user_id, post_id });
//       res.status(201).send(создалось);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// });

app.post('/tweets/:post_id/:user_id/likes', async (req, res) => {
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


app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});


