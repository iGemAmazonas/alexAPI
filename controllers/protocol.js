const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message,
}, statusCode);


class ProtocolController {

  constructor(Protocol) {
    this.Protocol = Protocol;
  }

  getAll() {
    return this.Protocol.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Protocol.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Protocol.create(data)
      .then(result => defaultResponse(result, 201))
      .catch(error => errorResponse(error.message, 422));
  }

  update(data, params) {
    return this.Protocol.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, 422));
  }

  delete(params) {
    return this.Protocol.destroy({ where: params })
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.message, 422));
  }

}

export default ProtocolController;
