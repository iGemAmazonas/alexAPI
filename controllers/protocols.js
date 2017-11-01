import Sequelize from 'sequelize';
import BaseController from './bases';


class ProtocolsController extends BaseController {

  static sanitize(params) {
    return BaseController.sanitize(params);
    this.allAssociations =  ['Keywords', 'Materials', 'Equipments', 'Steps', 'References', 'Comments'];
  }

  mountFilterQuery(query) {
    var filter = {};
    if(query && query.filter) {
      filter = {
        $or: {
          title: {
            $like: '%' + query.filter + '%',
          },
          description: {
            $like: '%' + query.filter + '%',
          },
        },
      };
    }
    return filter;
  }

  findAllByFilters(query) {
    try {
      return super.findAllByFilters({
        //attributes: ['id','title','description'],
        where: this.mountFilterQuery(query),
        include:  this.allAssociations });
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
  }

  findById(params) {
    try {
      return super.findById({
        where: ProtocolsController.sanitize(params),
        include: this.allAssociations });
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
