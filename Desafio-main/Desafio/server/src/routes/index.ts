import cors = require("cors");
import { Router, Request, Response } from "express";

import Aeronaves from "./aeronave";

const routes = Router()

routes.use(cors());

routes.use("/aeronaves", Aeronaves);


routes.use((req: Request, res: Response) => res.status(404).json({ error: "Requisição desconhecida" }));

export default routes;
