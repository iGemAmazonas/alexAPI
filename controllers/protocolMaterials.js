import HttpStatus from 'http-status';
import BaseController from './bases';
import MaterialsController from './materials';


class ProtocolMaterialsController {

  create(data, response) {
    try {
      if (response.data && !response.data.error && data.Materials) {
        const protocol = response.data;
        data.Materials.forEach((material) => {
          MaterialsController.sanitize(material);
        });
        return protocol.setMaterials(data.Materials)
          .then((result) => {
            const newProtocol = JSON.parse(JSON.stringify(protocol));
            newProtocol.Materials = result[0];
            return BaseController.defaultResponse(newProtocol, HttpStatus.CREATED);
          });
      }
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
    return BaseController.returnResponsePromise(response);
  }
}

export default ProtocolMaterialsController;
