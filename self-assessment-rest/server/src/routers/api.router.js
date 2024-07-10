const router = require('express').Router();
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');
const todoRouter = require('./todo.api.router');

router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/todo', todoRouter);
module.exports = router;
