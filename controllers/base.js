import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class BaseController {
  constructor(Model) {
    this.Model = Model;
  }

  findAllByFilters(filters) {
    return this.Model.findAll(filters)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  findById(filters) {
    return this.Model.findOne(filters)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Model.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, filters) {
    return this.Model.update(data, filters)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(filters) {
    return this.Model.destroy(filters)
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default BaseController;
