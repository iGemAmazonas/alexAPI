import BaseController from './bases';


class StepsController extends BaseController {

  static sanitize(params) {
    return BaseController.sanitize(params);
  }

  findAllByFilters(params) {
    try {
      return super.findAllByFilters({ where: StepsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  findById(params) {
    try {
      return super.findById({ where: StepsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  create(data) {
    try {
      return super.create(StepsController.sanitize(data));
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  update(data, params) {
    try {
      return super.update(
        StepsController.sanitize(data),
        { where: StepsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  delete(params) {
    try {
      return super.delete({ where: StepsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }
}

export default StepsController;
