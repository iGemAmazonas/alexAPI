import HttpStatus from 'http-status';
import BaseController from './bases';
import KeywordsController from './keywords';


class ProtocolKeywordsController {

  create(data, response) {
    try {
      if (response.data && !response.data.error && data.Keywords) {
        const protocol = response.data;
        data.Keywords.forEach((keyword) => {
          KeywordsController.sanitize(keyword);
        });
        return protocol.setKeywords(data.Keywords)
          .then((result) => {
            const newProtocol = JSON.parse(JSON.stringify(protocol));
            newProtocol.Keywords = result[0];
            return BaseController.defaultResponse(newProtocol, HttpStatus.CREATED);
          });
      }
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
    return BaseController.returnResponsePromise(response);
  }
}

export default ProtocolKeywordsController;
