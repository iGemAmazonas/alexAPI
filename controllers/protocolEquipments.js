import BaseController from './bases';
import EquipmentsController from './equipments';


class ProtocolEquipmentsController {

  create(data, response) {
    try {
      if (response.data && !response.data.error && data.Equipments) {
        const protocol = response.data;
        data.Equipments.forEach((equipment) => {
          EquipmentsController.sanitize(equipment);
        });
        return protocol.setEquipments(data.Equipments)
          .then((result) => {
            const newProtocol = JSON.parse(JSON.stringify(protocol));
            newProtocol.Equipments = result[0];
            return BaseController.defaultResponse(newProtocol);
          });
      }
    } catch (error) {
      return BaseController.returnErrorResponsePromise(error);
    }
    return BaseController.returnResponsePromise(response);
  }
}

export default ProtocolEquipmentsController;
