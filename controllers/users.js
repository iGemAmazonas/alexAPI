import BaseController from './base';

class UsersController extends BaseController {
  constructor(Users) {
    super(Users);
  }

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
};

export default UsersController;
