import Category from '../models/Category';

class CategoryService {
  async create(category) {
    const newQuestion = await Category.create(category);
    return newQuestion;
  }
}

export default new CategoryService();
