import {promises as fs} from 'fs';
import path from "path";

async function retornaDB(arquivo: string): Promise<Array<any>>
{
    const dbPath = path.join(process.cwd(),'src', 'app','db',arquivo);
    const dados = await fs.readFile(dbPath,'utf-8');
    
    return JSON.parse(dados);
}

async function armazenaDB(arquivo: string, dados: any)
{
    const dbPath = path.join(process.cwd(),'src', 'app','db',arquivo);
    await fs.writeFile(dbPath, JSON.stringify(dados,null,2));
}

const dbConexao = {
    retornaDB,
    armazenaDB
}

export default dbConexao;