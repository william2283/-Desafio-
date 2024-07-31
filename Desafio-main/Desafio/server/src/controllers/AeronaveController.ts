import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Aeronave } from "../entities/Aeronave";


class AeronaveController {

    public async getAllAeronave(req: Request, res: Response): Promise<Response> {
        const aeronaveRepository = AppDataSource.getRepository(Aeronave)
        const allAeronave = await aeronaveRepository.find()
        console.log(allAeronave)
        return res.json(allAeronave)
    }

    public async getAeronave(req: Request, res: Response): Promise<Response> {
        const idAeronave: any = req.params.uuid
        const aeronaveRepository = AppDataSource.getRepository(Aeronave)
        const allAeronave = await aeronaveRepository.findOneBy({ id: idAeronave })
        return res.json(allAeronave)
    }

    public async distribuicaoPorDecada(req: Request, res: Response): Promise<Response> {
        try {
            const aeronaveRepository = AppDataSource.getRepository(Aeronave);
            const aeronaves = await aeronaveRepository.find();
            const distribuicao: Record<string, number> = {};
            aeronaves.forEach(aeronave => {
                const decada = Math.floor(aeronave.ano / 10) * 10; 
                distribuicao[decada.toString()] = (distribuicao[decada.toString()] || 0) + 1; 
            });
            return res.json(distribuicao);
        } catch (error) {
            console.error('Erro ao obter distribuição por década:', error);
            return res.status(500).json({ message: 'Ocorreu um erro ao processar a distribuição por década.' });
        }
    }
    
    public async getFindAeronaves(req: Request, res: Response): Promise<Response> {
        try {
            const consulta = req.query.consulta as string;

            if (!consulta) {
                return res.status(400).json({ message: 'O parâmetro "consulta" é obrigatório.' });
            }
            const aeronaveRepository = AppDataSource.getRepository(Aeronave);
            const aeronaves = await aeronaveRepository.createQueryBuilder("aereronave")
                .where("aereronave.nome LIKE :consulta OR aereronave.id LIKE :consulta", { consulta: `%${consulta}%` })
                .getMany();
            if (aeronaves.length === 0) {
                return res.status(404).json({ message: 'Nenhuma aeronave encontrado com a consulta fornecida.' });
            }
            return res.json(aeronaves);
            
        } catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro ao buscar aeronaves.' });
        }
    }

    public async aeronavesDaUltimaSemana(req: Request, res: Response): Promise<Response> {
        try {
            const aeronaveRepository = AppDataSource.getRepository(Aeronave);
            const dataAtual = new Date();
            const dataInicioUltimaSemana = new Date(dataAtual);
            dataInicioUltimaSemana.setDate(dataInicioUltimaSemana.getDate() - 7);
            const aeronaves = await aeronaveRepository.createQueryBuilder("aereronave")
                .where("aereronave.created BETWEEN :dataInicio AND :dataFim", {
                    dataInicio: dataInicioUltimaSemana,
                    dataFim: dataAtual
                })
                .getMany();

            const quantidadeAeronaves = aeronaves.length;
            return res.json({ quantidade: quantidadeAeronaves });
        } catch (error) {
            console.error('Erro ao obter aeronaves da última semana:', error);
            return res.status(500).json({ message: 'Ocorreu um erro ao processar as aeronaves da última semana.' });
        }
    }
    


    public async postAeronave(req: Request, res: Response): Promise<Response> {
        const createAeronave = req.body
        const aeronaveRepository = AppDataSource.getRepository(Aeronave)
        const insertAeronave = new Aeronave();
        insertAeronave.nome = createAeronave.nome
        insertAeronave.marca = createAeronave.marca
        insertAeronave.ano = createAeronave.ano
        insertAeronave.descricao = createAeronave.descricao
        insertAeronave.vendido = createAeronave.vendido
        const allAeronave = await aeronaveRepository.save(insertAeronave)
        return res.json(allAeronave)
    }
 

    public async putAeronave(req: Request, res: Response): Promise<Response> {
        const createAeronave = req.body
        const idAeronave: any = req.params.uuid
        const aeronaveRepository = AppDataSource.getRepository(Aeronave)
        const findAeronave = await aeronaveRepository.findOneBy({ id: idAeronave })
        findAeronave.nome = createAeronave.nome
        findAeronave.marca = createAeronave.marca
        findAeronave.ano = createAeronave.ano
        findAeronave.descricao = createAeronave.descricao
        findAeronave.vendido = createAeronave.vendido
 
        const allAeronave = await aeronaveRepository.save(findAeronave)
        return res.json(allAeronave)
    }

    public async deleteAeronave(req: Request, res: Response): Promise<Response> {
        const idAeronave: any = req.params.uuid
        const aeronaveRepository = AppDataSource.getRepository(Aeronave)
        const findAeronave = await aeronaveRepository.findOneBy({ id: idAeronave })
        const allAeronave = await aeronaveRepository.remove(findAeronave)
        return res.json(allAeronave)
    }

}
export default new AeronaveController();

