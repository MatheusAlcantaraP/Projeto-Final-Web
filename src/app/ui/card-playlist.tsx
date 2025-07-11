import "@/app/styles/playlistShow.css";
import Link from "next/link";
import dbConexao from "../libs/db-conexao";
import { redirect } from "next/navigation";

const arquivo = 'db-playlist.json';

export interface PlaylistProps {
    id: string;
    nome: string;
    url: string;
    estilo: string;
    userEmail: string;
    descricao: string;
}

export default function Playlist(props: PlaylistProps) {
    const deletePlaylist = async () => {
        'use server';

        const playlist = await dbConexao.retornaDB(arquivo);
        const playlistToRemove = playlist.findIndex((p) => p.id === props.id);
        playlist.splice(playlistToRemove,1);
        await dbConexao.armazenaDB(arquivo, playlist);

        const dbMusicasPath = "db-musicas.json";
        const musicasDB = await dbConexao.retornaDB(dbMusicasPath);
        const musicasFiltradas = musicasDB.filter((musica: any) => musica.playlistID !== props.id);
        await dbConexao.armazenaDB(dbMusicasPath, musicasFiltradas);

        redirect('/dashboard/playlists');
    }
      
    return (
		<div className="containerPlaylistCriada">
			<div key={props.id} className="playlistCriadaBox">
				<img src={props.url || "https://via.placeholder.com/150"} alt={props.nome} className="playlistImage" />
				<div className="playlistInfo">
					<h3 className="playlistTitulo">{props.nome}</h3>
					<p className="playlistEstilo">{props.estilo}</p>
					<p className="playlistDescricao">{props.descricao}</p>
					<Link href={`/dashboard/playlists/${props.id}`}>
						<button className="playlistLinkBTN">Editar / Adicionar Músicas</button>
					</Link>
					<form action={deletePlaylist} className="btn">
						<button className="deleteBTN">Deletar</button>
					</form>
				</div>
			</div>
		</div>   
    ) 
}
