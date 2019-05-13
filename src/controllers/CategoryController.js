import CategoryService from '../services/CategoryService';

class CategoryController {
  async store(req, res) {
    try {
      const cats = await CategoryService.create(req.body);
      return res.status(201).send(cats);
    } catch (error) {
      /* istanbul ignore next */
      console.log('[error]', error);
      /* istanbul ignore next */
      return res.status(400).send({ message: error.message });
    }
  }
}

export default new CategoryController();
