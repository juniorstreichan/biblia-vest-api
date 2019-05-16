import Repository from '../models/Category';

class CategoryService {
  async create(category) {
    const newQuestion = await Repository.create(category);
    return newQuestion;
  }
}

export default new CategoryService();
