import BaseController from './bases';
import ReferencesController from './references';


class ProtocolReferencesController {

  create(data, response) {
    try {
      if (response.data && !response.data.error && data.References) {
        const protocol = response.data;
        data.References.forEach((reference) => {
          ReferencesController.sanitize(reference);
        });
        return protocol.setReferences(data.References)
          .then((result) => {
            const newProtocol = JSON.parse(JSON.stringify(protocol));
            newProtocol.References = result[0];
            return BaseController.defaultResponse(newProtocol);
          });
      }
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
    return BaseController.returnResponsePromise(response);
  }
}

export default ProtocolReferencesController;
