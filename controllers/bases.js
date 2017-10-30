import HttpStatus from 'http-status';


class BaseController {

  constructor(Model) {
    this.Model = Model;
  }

  static sanitize(params) {
    // if undefined
    if (params === undefined) return {};
    // else if null or empty or false or 0
    else if (!params) throw new Error('Filters cannot be empty');
    // else
    else return params;
  }

  static defaultResponse(data, statusCode = HttpStatus.OK) {
    return { data, statusCode };
  }

  static errorResponse(message, statusCode = HttpStatus.BAD_REQUEST) {
    return BaseController.defaultResponse({ error: message }, statusCode);
  }

  static returnErrorResponsePromise(error) {
    const response = BaseController.errorResponse(error.message);
    return new Promise(fulfill => fulfill(response));
  }

  static returnResponsePromise(response) {
    return new Promise(fulfill => fulfill(response));
  }

  findAllByFilters(filters) {
    return this.Model.findAll(filters)
      .then(result => BaseController.defaultResponse(result))
      .catch(error => BaseController.errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  findById(filters) {
    return this.Model.findOne(filters)
      .then(result => BaseController.defaultResponse(result))
      .catch(error => BaseController.errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  create(data, filters = '') {
    return this.Model.create(data, filters)
      .then(result => BaseController.defaultResponse(result, HttpStatus.CREATED))
      .catch(error => BaseController.errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, filters) {
    return this.Model.update(data, filters)
      .then(result => BaseController.defaultResponse(result))
      .catch(error => BaseController.errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(filters) {
    return this.Model.destroy(filters)
      .then(result => BaseController.defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => BaseController.errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default BaseController;
