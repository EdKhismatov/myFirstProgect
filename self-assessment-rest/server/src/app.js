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


// app.post('/', async (req, res) => {
//   const { post, user_id, img } = req.body;
//   const response = await Post.create({ post, user_id, img });
//   res.json(response);
// });

// app.get('/post/', async (req, res) => {

//   const response = await Post.findAll();
//   res.json(response);
// });

// app.get('/:user_id/post', async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const response = await Post.findAll({
//       where: { user_id },
//     });
//     res.status(200).send(response);
//   } catch (error) {
//     console.log('error ', error);
//   }
// });

// app.get('/:user_id/likes/tweets', async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const like = await Like.findAll({ where: { user_id } });
//     const tweet = like.map((el) => el.post_id);
//     const tweets = await Post.findAll({ where: { id: tweet } });
//     const result = tweets.map((el) => el.get({ plain: true }));
//     res.send(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// });


app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});


