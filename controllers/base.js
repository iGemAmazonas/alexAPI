import HttpStatus from 'http-status';

class BaseController {
  constructor(Model) {
    this.Model = Model;
  }

  defaultResponse(data, statusCode = HttpStatus.OK) {
    return { data, statusCode };
  }

  errorResponse(message, statusCode = HttpStatus.BAD_REQUEST) {
    return this.defaultResponse({ error: message }, statusCode);
  }

  sanitize(params) {
    // if undefined
    if (params === undefined) return {};
    // else if null or empty or false or 0
    else if(!params) throw new Error("Filters cannot be empty");
    // else
    else return params;
  }

  findAllByFilters(filters) {
    return this.Model.findAll(filters)
      .then(result => this.defaultResponse(result))
      .catch(error => this.errorResponse(error.message));
  }

  findById(filters) {
    return this.Model.findOne(filters)
      .then(result => this.defaultResponse(result))
      .catch(error => this.errorResponse(error.message));
  }

  create(data) {
    return this.Model.create(data)
      .then(result => this.defaultResponse(result, HttpStatus.CREATED))
      .catch(error => this.errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, filters) {
    return this.Model.update(data, filters)
      .then(result => this.defaultResponse(result))
      .catch(error => this.errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(filters) {
    return this.Model.destroy(filters)
      .then(result => this.defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => this.errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default BaseController;
