import "@/app/styles/playlistMusicas.css";
import Link from 'next/link';
import dbConexao from "@/app/libs/db-conexao";
import Playlist from "@/app/ui/card-playlist";
import { isSessionValid } from "@/app/libs/session";
import { redirect } from "next/navigation";

const dbPlaylistPath = "db-playlist.json";

export default async function ListaPlaylists(){
    
    const session = await isSessionValid();

    if(!session)
    {
        redirect('/login');
    }

    const userEmail = session.userEmail;
    const todasPlaylists = await dbConexao.retornaDB(dbPlaylistPath);
    const playlists = todasPlaylists.filter((p) => p.userEmail === userEmail);

    const plalistsCards = playlists.map((playlist) => {
        return <Playlist {...playlist} key={playlist.id}/>
    });

    return(    
        <div>
            <div>
                <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lexend+Giga:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
            </div>
            <div className="pagina">
                <h2 className="titulo">Suas Playlists</h2>
                <div>
                    <Link href={`/dashboard/`}>
                        <button className="CriarPlaylistBTN">Criar outras Playlist</button>
                    </Link>
                </div>
                <div className="containerPlaylistCriada">
                    {plalistsCards}
                </div>
            </div> 
        </div>  
    )
}
