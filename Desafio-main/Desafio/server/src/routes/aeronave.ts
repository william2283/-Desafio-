import { Router } from "express";
import AeronaveController from "../controllers/AeronaveController";

const routes = Router();

routes.get('/', AeronaveController.getAllAeronave);
routes.post('/', AeronaveController.postAeronave);
routes.get('/find', AeronaveController.getFindAeronaves);
routes.get('/decada', AeronaveController.distribuicaoPorDecada);
routes.get('/ultima-semana', AeronaveController.aeronavesDaUltimaSemana);

routes.get('/:uuid', AeronaveController.getAeronave);
routes.put('/:uuid', AeronaveController.putAeronave);
routes.delete('/:uuid', AeronaveController.deleteAeronave);

export default routes;

