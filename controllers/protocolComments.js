import BaseController from './bases';
import CommentsController from './comments';


class ProtocolCommentsController {

  create(data, response) {
    try {
      if (response.data && !response.data.error && data.Comments) {
        const protocol = response.data;
        data.Comments.forEach((comment) => {
          CommentsController.sanitize(comment);
        });
        return protocol.setComments(data.Comments)
          .then((result) => {
            const newProtocol = JSON.parse(JSON.stringify(protocol));
            newProtocol.Comments = result[0];
            return BaseController.defaultResponse(newProtocol);
          });
      }
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
    return BaseController.returnResponsePromise(response);
  }
}

export default ProtocolCommentsController;
