import BaseController from './bases';


class MaterialsController extends BaseController {

  static sanitize(params) {
    return BaseController.sanitize(params);
  }

  findAllByFilters(params) {
    try {
      return super.findAllByFilters({ where: MaterialsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  findById(params) {
    try {
      return super.findById({ where: MaterialsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  create(data) {
    try {
      return super.create(MaterialsController.sanitize(data));
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  update(data, params) {
    try {
      return super.update(
        MaterialsController.sanitize(data),
        { where: MaterialsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  delete(params) {
    try {
      return super.delete({ where: MaterialsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }
}

export default MaterialsController;
