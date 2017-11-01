import HttpStatus from 'http-status';
import BaseController from './bases';
import StepsController from './steps';


class ProtocolStepsController {

  create(data, response) {
    try {
      if (response.data && !response.data.error && data.Steps) {
        const protocol = response.data;
        data.Steps.forEach((step) => {
          StepsController.sanitize(step);
        });
        return protocol.setSteps(data.Steps)
          .then((result) => {
            const newProtocol = JSON.parse(JSON.stringify(protocol));
            newProtocol.Steps = result[0];
            return BaseController.defaultResponse(newProtocol, HttpStatus.CREATED);
          });
      }
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
    return BaseController.returnResponsePromise(response);
  }
}

export default ProtocolStepsController;
