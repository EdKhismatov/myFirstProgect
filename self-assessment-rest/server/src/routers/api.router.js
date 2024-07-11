const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
const todoRouter = require('./todo.api.router');
const postRouter = require('./posts.api.router');
const homeRouter = require('./home.api.router');
const likeRouter = require('./like.api.router');

router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/todo', todoRouter);
router.use('/post', postRouter);
router.use('/home', homeRouter);
router.use('/like', likeRouter);

module.exports = router;
