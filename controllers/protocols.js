import BaseController from './base';
/*
const allAssociations = [
  { model: 'Steps' },
  { model: 'Articles' },
  { model: 'Keywords' },
  { model: 'ProtocolComments' },
  { model: 'ProtocolReagents' },
  { model: 'ProtocolMaterials' },
]; */

class ProtocolsController extends BaseController {
  sanitize(params) {
    return params;
  }

  findAllByFilters(params) {
    return super.findAllByFilters({ where: this.sanitize(params) });
  }

  findById(params) {
    return super.findById({ where: this.sanitize(params) });
  }

  create(data) {
    return super.create(this.sanitize(data));
  }

  update(data, params) {
    return super.update(this.sanitize(data), { where: this.sanitize(params) });
  }

  delete(params) {
    return super.delete({ where: this.sanitize(params) });
  }
}

export default ProtocolsController;
