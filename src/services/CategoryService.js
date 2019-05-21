import Repository from '../models/Category';

class CategoryService {
  async create(category) {
    const newCategories = await Repository.create(category);
    return newCategories;
  }

  async findAll() {
    const categories = await Repository.find({}, 'name');
    return categories;
  }
}

export default new CategoryService();
