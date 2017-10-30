import BaseController from './bases';


class KeywordsController extends BaseController {

  static sanitize(params) {
    return BaseController.sanitize(params);
  }

  findAllByFilters(params) {
    try {
      return super.findAllByFilters({ where: KeywordsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  findById(params) {
    try {
      return super.findById({ where: KeywordsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  create(data) {
    try {
      return super.create(KeywordsController.sanitize(data));
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  update(data, params) {
    try {
      return super.update(
        KeywordsController.sanitize(data),
        { where: KeywordsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  delete(params) {
    try {
      return super.delete({ where: KeywordsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }
}

export default KeywordsController;
