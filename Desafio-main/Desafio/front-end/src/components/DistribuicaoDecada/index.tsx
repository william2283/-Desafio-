import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URI } from '../../enumerations/uri';

function DistribuicaoDecada() {
    const [distribuicao, setDistribuicao] = useState({});

    useEffect(() => {
        fetchDistribuicaoPorDecada();
    }, []);

    const fetchDistribuicaoPorDecada = async () => {
        try {
            const response = await axios.get(`${URI.AERONAVE_DECADA}`);
            setDistribuicao(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {Object.entries(distribuicao).map(([decada, quantidade]) => (
                    <li key={decada}>{`${decada}: ${quantidade} aeronaves`}</li>
                ))}
            </ul>
        </div>
    );
}

export default DistribuicaoDecada;
