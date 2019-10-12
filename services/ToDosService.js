const { ToDo } = require('./../models');

class ToDosService {
  async create(todo) {
    let newToDo = new ToDo(todo);
    newToDo = await newToDo.save();

    return newToDo;
  }

  async get(id, page = 1, perPage = 1) {
    const searchParam = id ? { _id: id } : {};

    const todos = await ToDo
      .find(searchParam)
      .skip(perPage * (page - 1))
      .limit(perPage);

    return todos.length === 0 ? null : todos;
  }

  async getOneById(id) {
    return await ToDo.findById(id);
  }

  async update(id, todo) {
    return await ToDo.findOneAndUpdate({ _id: id }, todo, { new: true });
  }

  async delete(id) {
    return await ToDo.findOneAndRemove({ _id: id });
  }
}

module.exports = new ToDosService();
