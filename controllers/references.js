import BaseController from './bases';


class ReferencesController extends BaseController {

  static sanitize(params) {
    return BaseController.sanitize(params);
  }

  findAllByFilters(params) {
    try {
      return super.findAllByFilters({ where: ReferencesController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  findById(params) {
    try {
      return super.findById({ where: ReferencesController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  create(data) {
    try {
      return super.create(ReferencesController.sanitize(data));
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  update(data, params) {
    try {
      return super.update(
        ReferencesController.sanitize(data),
        { where: ReferencesController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  delete(params) {
    try {
      return super.delete({ where: ReferencesController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }
}

export default ReferencesController;
