import { useState } from 'react';
import axios from 'axios';
import './index.css';
import { URI } from '../../enumerations/uri';

function Formulario() {
    const [marca, setMarca] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ano, setAno] = useState('');
    const [vendido, setVendido] = useState('');

    const handleSubmit = async () => {
        try {
            const formData = { marca, nome, ano, descricao, vendido: vendido === 'true' };
            await axios.post(URI.CRIAR_AERONAVE, formData);
            setNome('');
            setMarca('');
            setDescricao('');
            setAno('');
            setVendido('');
            alert('Aeronave cadastrada com sucesso!');
            window.location.reload();
        } catch (error) {
            console.log('Erro ao cadastrar aeronave:', error);
            alert('Erro ao cadastrar aeronave. Por favor, tente novamente.');
        }
    };

    return (
        <div>
            <div className="titulo">
                <p>Gestão de Aeronaves</p>
            </div>
            <div className="container-formulario">
                <div className="container-select-marca">
                    <select className="select-marca" value={marca} onChange={(e) => setMarca(e.target.value)}>
                        <option value="" disabled>Marca</option>
                        <option value="Embraer">Embraer</option>
                        <option value="Boeing">Boeing</option>
                        <option value="Airbus">Airbus</option>
                    </select>
                </div>
                <div className="container-input-aeronave">
                    <input type="text" placeholder="Aeronave" value={nome} onChange={(e) => setNome(e.target.value)} className="input-aeronave" />
                    <input type="text" placeholder="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="input-descricao" />
                </div>
                <div className="input-row">
                    <input type="text" placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} className="input-ano" />

                    <select className="select-vendido" value={vendido} onChange={(e) => setVendido(e.target.value)}>
                        <option value="" disabled>Vendido</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>
                <div className="button-container">
                    <button className="button" onClick={handleSubmit}>Gravar</button>
                </div>
            </div>
        </div>
    );
}

export default Formulario;
