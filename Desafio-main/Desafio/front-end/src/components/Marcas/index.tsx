import { useEffect, useState } from 'react';
import axios from 'axios';
import { URI } from '../../enumerations/uri';
import { Aeronaves } from '../../types/aeronave';


  
function Marcas() {
    const [aeronaves, setAeronaves] = useState([]);

    useEffect(() => {
        fetchAeronaves();
    }, []);

    const fetchAeronaves = async () => {
        try {
            const response = await axios.get(`${URI.LISTAR_AERONAVE}`);
            setAeronaves(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const contarAeronavesPorFabricante = (aeronaves: Aeronaves[]) => {
        const contagem: { [marca: string]: number } = {};

        aeronaves.forEach(aeronave => {
            const marca = aeronave.marca;

            if (contagem[marca]) {
                contagem[marca]++;
            } else {
                contagem[marca] = 1;
            }
        });

        return contagem;
    }
    const contagemPorFabricante = contarAeronavesPorFabricante(aeronaves);

    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {Object.entries(contagemPorFabricante).map(([marca, quantidade]) => (
                    <li key={marca}>{marca} - {quantidade} aeronaves</li>
                ))}
            </ul>
        </div>
    );
}

export default Marcas;
