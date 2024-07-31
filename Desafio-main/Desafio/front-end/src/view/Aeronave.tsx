import AeronaveRegistaSemana from "../components/AeronaveRegistradaSemana";
import DistribuicaoDecada from "../components/DistribuicaoDecada";
import Formulario from "../components/Formulario";
import Tabela from "../components/Tabela";

function Aeronave() {
  return ( 
    <div style={{ width: '50%', margin: '0 auto'}}> 
      <Formulario/>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <DistribuicaoDecada/>
        </div>
        <div style={{ marginRight: "10px", marginTop: "20px"}}>
          <AeronaveRegistaSemana/>  
        </div>
      </div>
      <Tabela/>
    </div>
  );
}

export default Aeronave;
