const router = require('express').Router();
const { Todo, User } = require('../../db/models');

router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const entrie = await Todo.findAll({ where: { user_id } });
    res.json(entrie);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { todo, user_id, done } = req.body;
    const respons = await Todo.create({
      todo,
      user_id,
      done,
    });
    res.status(200).send(respons);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({ where: { id } });
    res.status(200).send('Запись успешно удалена');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.delete('/', async (req, res) => {
  try {
    res.status(200).send('Запись успешно удалена');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'server');
    const entrie = await Todo.findOne({ where: { id } });
    await entrie.update({
      done: !entrie.done,
    });

    await entrie.save();
    res.status(200).send(entrie);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
