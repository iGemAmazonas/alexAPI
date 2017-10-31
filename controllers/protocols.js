import BaseController from './bases';


class ProtocolsController extends BaseController {

  static sanitize(params) {
    return BaseController.sanitize(params);
  }

  findAllByFilters(params) {
    try {
      return super.findAllByFilters({ where: ProtocolsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  findById(params) {
    try {
      return super.findById({
        where: ProtocolsController.sanitize(params),
        include: ['Keywords', 'Materials', 'Equipments', 'Steps', 'References', 'Comments'] });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  create(data) {
    try {
      return super.create(ProtocolsController.sanitize(data), { include: ['Steps'] });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  update(data, params) {
    try {
      return super.update(
        ProtocolsController.sanitize(data),
        { where: ProtocolsController.sanitize(params) });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  delete(params) {
    try {
      return super.delete({ where: ProtocolsController.sanitize(params), include: ['Steps'] });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }
}

export default ProtocolsController;
