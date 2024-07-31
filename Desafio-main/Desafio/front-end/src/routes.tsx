import { Route, Routes } from "react-router-dom";
import Aeronave from "./view/Aeronave";
import DetalhesAeronave from "./view/DetalhesAeronave";

function Rotas(){
    return(
   
        <Routes>
            <Route path="/" element={<Aeronave />} />   
            <Route path="/aeronaves/:uuid" element={<DetalhesAeronave />} />   
        </Routes>
    )
}

export default Rotas