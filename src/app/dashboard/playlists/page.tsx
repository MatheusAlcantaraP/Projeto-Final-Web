import "@/app/styles/playlistMusicas.css";
import Link from 'next/link';
import dbConexao from "@/app/libs/db-conexao";
import { isSessionValid } from "@/app/libs/session";
import { redirect } from "next/navigation";

const dbPlaylistPath = "db-playlist.json";

export default async function ListaPlaylists() {
    
    const session = await isSessionValid();
    if (session) {
        console.log(session.userEmail); 
        const userEmail = session.userEmail
        const todasPlaylists = await dbConexao.retornaDB(dbPlaylistPath);
        const playlists = todasPlaylists.filter((p) => p.userEmail === userEmail);
        
        return (
        <div className="pagina">
            <h2 className="titulo">Suas Playlists</h2>
            <div>
                <Link href={`/dashboard/`}>
                    <button className="CriarPlaylistBTN">Criar outras Playlist</button>
                </Link>
            </div>
            <div className="containerPlaylistCriada">
                {playlists.map((p) => (
                    <div key={p.id} className="playlistCriadaBox">
                    <img src={p.url || "https://via.placeholder.com/150"} alt={p.nome} className="playlistImage" />
                    <div className="playlistInfo">
                        <h3 className="playlistTitulo">{p.nome}</h3>
                        <p className="playlistEstilo">Estilo: {p.estilo}</p>
                        <Link href={`/dashboard/playlists/${p.id}`}>
                        <button className="playlistLinkBTN">Editar / Adicionar Músicas</button>
                        </Link>
                    </div>
                    </div>
                ))}
            </div> 
        </div>   
        )
    }
}