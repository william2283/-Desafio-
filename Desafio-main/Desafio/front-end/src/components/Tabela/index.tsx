import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; 
import { URI } from '../../enumerations/uri';
import { Aeronaves } from "../../types/aeronave";
import Marcas from "../Marcas/index";
import { Link } from 'react-router-dom'; 
import { FaEdit, FaTrash } from 'react-icons/fa';

function Tabela() {
  const [aeronaves, setAeronaves] = useState<Aeronaves[]>([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');

  useEffect(() => {
    fetchAeronaves();
  }, [termoPesquisa]);

  const fetchAeronaves = async () => {
    try {
      let response;
      if (termoPesquisa) {
        response = await axios.get(`${URI.AERONAVE_FIND}`, {
          params: {
            consulta: termoPesquisa
          }
        });
      } else {
        response = await axios.get(`${URI.LISTAR_AERONAVE}`);
      }
      setAeronaves(response.data); 
    } catch (error) {
      console.log(error);
    }
  };

  const handlePesquisa = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermoPesquisa(event.target.value);
  };


  const handleExcluirAeronave = async (id: number) => {
    try {
      await axios.delete(`${URI.DELETE_AERONAVE}${id}`);
      setAeronaves(aeronaves.filter((aeronave) => aeronave.id !== id));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisa Por Modelo ou ID"
        name="Pesquisa"
        className="input-pesquisa"
        value={termoPesquisa}
        onChange={handlePesquisa}
      />
      
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Descrição</th>
            <th>Vendido</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {aeronaves.map(aeronave => (
            <tr key={aeronave.id}>
              <td>{aeronave.id}</td>
              <td>{aeronave.marca}</td>
              <td>{aeronave.nome}</td>
              <td>{aeronave.ano}</td>
              <td>{aeronave.descricao}</td>
              <td>{aeronave.vendido ? 'Sim' : 'Não'}</td>
              <td><Link to={`/aeronaves/${aeronave.id}`}><FaEdit  className="icone"/></Link></td>
              <td><button onClick={() => handleExcluirAeronave(aeronave.id)}><FaTrash  className="icone"/></button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Marcas />
    </div>
  );
}

export default Tabela;
