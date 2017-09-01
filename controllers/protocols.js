import HttpStatus from 'http-status';
import BaseController from './base';

const allAssociations = [
  { model: 'ProtocolKeywords' },
];

class ProtocolsController extends BaseController {
  sanitize(params) {
    return super.sanitize(params);
  }

  findAllByFilters(params) {
    try {
      return super.findAllByFilters({ where: this.sanitize(params) })
    } catch (error) {
      return super.errorResponse(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findById(params) {
    try {
      return super.findById({ where: this.sanitize(params) });
    } catch (error) {
      return super.errorResponse(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  create(data) {
    try {
      return super.create(this.sanitize(data), { include: allAssociations });
    } catch (error) {
      return super.errorResponse(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(data, params) {
    try {
      return super.update(this.sanitize(data), { where: this.sanitize(params) });
    } catch (error) {
      return super.errorResponse(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  delete(params) {
    try {
      return super.delete({ where: this.sanitize(params) });
    } catch (error) {
      return super.errorResponse(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

export default ProtocolsController;
