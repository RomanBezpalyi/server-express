const toDosService = require('./../services/ToDosService');

class ToDosController {
  async create(req, res) {
    const todo = req.body;

    const newTodo = await toDosService.create(todo);
    return res.json({ todo: newTodo });
  }

  async getAll(req, res) {
    const todos = await toDosService.get();
    res.json({ todos });
  }

  async getOne(req, res) {
    const id = req.params.id;
    console.log(id)
    const todo = await toDosService.get(id);

    if (!todo) {
      res.status(404).json({ message: 'Todo list not found.' });
    }

    res.json({ todo });
  }

  async update(req, res) {
    const id = req.params.id;
    const todoToUpdate = req.body;

    let todo = await toDosService.getOneById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo list not found.' })
    }

    todo = await toDosService.update(id, todoToUpdate);
    res.json(todo);
  }

  async delete(req, res) {
    const id = req.params.id;

    let todo = await toDosService.getOneById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo list not found.' })
    }

    todo = await toDosService.delete(id);
    res.json(todo);
  }
}

module.exports = new ToDosController();
