import "@/app/styles/playlistMusicas.css";
import Link from 'next/link';
import dbConexao from "@/app/libs/db-conexao";
import { isSessionValid } from "@/app/libs/session";
import { redirect } from "next/navigation";
import Playlist from "@/app/ui/card-playlist";

const dbPlaylistPath = "db-playlist.json";

export default async function ListaPlaylists() {
    
    const session = await isSessionValid();
    if (session) {
        console.log(session.userEmail); 
        const userEmail = session.userEmail
        const todasPlaylists = await dbConexao.retornaDB(dbPlaylistPath);
        const playlists = todasPlaylists.filter((p) => p.userEmail === userEmail);
        const plalistsCards = playlists.map((playlist) => {
        return <Playlist {...playlist} key={playlist.id}/>
    });

        return (
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
        )
    }
}