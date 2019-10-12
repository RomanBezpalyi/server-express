const router = require('express').Router();
const { toDosController } = require('./../controllers');

router
  .post('/', toDosController.create)
  .get('/', toDosController.getAll)
  .get('/:id', toDosController.getOne)
  .put('/:id', toDosController.update)
  .delete('/:id', toDosController.delete)

module.exports = router;
