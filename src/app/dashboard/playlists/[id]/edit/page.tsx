
import dbConexao from "@/app/libs/db-conexao";
import { PlaylistProps } from "@/app/ui/card-playlist";
import { redirect } from "next/navigation";
import "@/app/styles/editInfo.css";
import { isSessionValid } from "@/app/libs/session";
import Link from "next/link";

const arquivo = 'db-playlist.json';

interface EditPlaylistProps {
    params: Promise<{id: string}>;
}

export default async function EditInfoPlaylist({params}: EditPlaylistProps){
    const {id} = await params;
    
    const playlistDB = await dbConexao.retornaDB(arquivo);

    const playlistToEdit: PlaylistProps = playlistDB.find((p: PlaylistProps) => p.id === id);
    const playlistToEditIndex: number = playlistDB.findIndex((p) => p.id === id);

    const session = await isSessionValid();
    if (session){
    const Email = session.userEmail
    
    const updatePlaylist = async (formData : FormData) => {
        'use server';

        const updatedPlaylist: PlaylistProps = {
                id,
                nome: formData.get('nome') as string,
                url: formData.get('url') as string,
                estilo:formData.get('estilo') as string,
                descricao: formData.get('descricao') as string,
                userEmail: Email as string
        }
        
        playlistDB.splice(playlistToEditIndex,1,updatedPlaylist);

        await dbConexao.armazenaDB(arquivo,playlistDB);

        redirect('/dashboard/playlists');
        
    }
    
    return(
        <div>
            <div>
                 <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lexend+Giga:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
            </div>
                    <div className="containerATPrincipal"> 
                            <div className="BTNpl">
                                <Link  className="BTNmostrar" href={`/dashboard/playlists/${id}`}>Buscar Musicas</Link>
                                <Link  className="BTNmostrar" href={`/dashboard/playlists/${id}/mostraMSC`}>Ver Playlist</Link>
                                <Link  className="BTNmostrar" href={`/dashboard/playlists/${id}/edit`}>Editar Playlist</Link>
                            </div>
                            <div className="dispo">
                                <h2>Mude todas<br />
                                informações de<br />
                                sua playlist!</h2>
                            
                        <form className="containerATPlaylist" action={updatePlaylist}>
                            <img src={playlistToEdit.url} alt="URL" className="IMGAT" />
                            <input name="nome" defaultValue={playlistToEdit.nome}  id='nome' className="inputs" placeholder="Nome da Playlist"/>
                            <input name="url"  defaultValue={playlistToEdit.url}  id='url'className="inputs" placeholder="URL da Imagem"/>
                            <input name="estilo" defaultValue={playlistToEdit.estilo}   id='estilo' className="inputs" placeholder="Estilo Musical"/>
                            <input name="descricao" defaultValue={playlistToEdit.descricao}  id='descricao' className="inputs" placeholder="Descrição da playlist"/>
                            <button type="submit" className="btnAtualizarPlaylist">Atualizar</button>
                        </form>
                    </div>
                    </div>
        </div>
    )
}
}
