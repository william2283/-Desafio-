import { useState, useEffect } from 'react';
import axios from 'axios';

import { URI } from '../enumerations/uri';

function Editar() {
    const [marca, setMarca] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ano, setAno] = useState('');
    const [vendido, setVendido] = useState(true);

    const id = window.location.href.split("/")[4];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URI.AERONAVE_ESPECIFICA}${id}`);
                const aeronave = response.data;
                setMarca(aeronave.marca || '');
                setNome(aeronave.nome || '');
                setDescricao(aeronave.descricao || '');
                setAno(aeronave.ano || '');
                setVendido(aeronave.vendido);


            } catch (error) {
                console.error('Erro ao obter detalhes da aeronave:', error);
            }
        };

        fetchData();
    }, [id])

    const handleSubmit = async () => {
        try {
            const formData = { marca, nome, descricao, ano, vendido };
            await axios.put(`${URI.ALTERA_AERONAVE}${id}`, formData);
            alert('Aeronave atualizada com sucesso!');
            window.location.assign("/");
        } catch (error) {
            console.error('Erro ao atualizar aeronave:', error);
            alert('Erro ao atualizar aeronave. Por favor, tente novamente.');
        }
    };

    const handleVoltar = async () => {
            window.location.assign("/");
    };

    return (
        <div style={{ width: '50%', margin: '0 auto' }}>
            <div className="titulo">
                <p>Editar Aeronave</p>
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
                    <input type="text" placeholder="Descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="input-descricao" />
                </div>
                <div className="input-row">
                    <input type="text" placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} className="input-ano" />
                    <select className="select-vendido" value={vendido ? 'true' : 'false'} onChange={(e) => setVendido(e.target.value === 'true')}>
                        <option value="" disabled>Vendido</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>
                <div className="button-containerEditar ">
                    <button className="button" onClick={handleVoltar}>Voltar</button>
                    <button className="button" onClick={handleSubmit}>Editar</button>
                </div>
            </div>
        </div>
    );
}

export default Editar;
