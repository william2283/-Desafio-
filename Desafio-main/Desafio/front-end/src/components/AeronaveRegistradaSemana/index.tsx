import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URI } from '../../enumerations/uri';

function AeronaveRegistaSemana() {
    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
        fetchQuantidadeRegistros();
    }, []);

    const fetchQuantidadeRegistros = async () => {
        try {
            const response = await axios.get(`${URI.AERONAVE_SEMANA}`);
            setQuantidade(response.data.quantidade);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div >
            <p>{`Essa semana: ${quantidade}`}</p>
        </div>
    );
}

export default AeronaveRegistaSemana;
