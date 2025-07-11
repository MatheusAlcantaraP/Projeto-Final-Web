import "@/app/styles/playlistShow.css";
import dbConexao from "@/app/libs/db-conexao";
import MostraPlaylistClient from './mostraPL';
import Link from 'next/link';
import { redirect } from "next/navigation";
import { isSessionValid } from "@/app/libs/session";
import { PlaylistProps } from "@/app/ui/card-playlist"

const arquivo = 'db-playlist.json';
const dbMusicasPath = "db-musicas.json";

interface PlaylistIDProps {
	params: { id: string };
}

export default async function MostraPlaylist({ params }: PlaylistIDProps) {

	const session = await isSessionValid();

	if (!session) {
		redirect('/login');
	}
  
	const {id} = await params;
	const playlists = await dbConexao.retornaDB(arquivo);
	const IDplaylist: PlaylistProps = playlists.find((p: PlaylistProps) => p.id === id);

	return (
    	<div className="paginaMusica">
			<Link href={`/dashboard/playlists`}>
			<button className="BTNmusica">Ver Playlists</button>
			</Link>
			<div className="containerPlaylistCriada">
				<div className="containerInfos">
					<img
					src={IDplaylist.url || "https://via.placeholder.com/150"}
					alt="Capa"
					className="playlistImage"
					/>
					<div className="playlistInfo">
					<p className="playlistNome">{IDplaylist.nome}</p>
					<p className="playlistEstilo">{IDplaylist.estilo}</p>
					<p className="playlistDescricao">{IDplaylist.descricao}</p>
					</div>
				</div>
				<div className="containerMeio">
					<div className="BTNpl">
						<Link  className="BTNmostrar" href={`/dashboard/playlists/${id}`}>Buscar Musicas</Link>
						<Link  className="BTNmostrar" href={`/dashboard/playlists/${id}/mostraMSC`}>Ver Playlist</Link>
						<Link  className="BTNmostrar" href={`/dashboard/playlists/${id}/edit`}>Editar Playlist</Link>
						<p className="tituloMusica">Músicas Salvas</p>
					</div>
					<div>
						<MostraPlaylistClient playlistId={IDplaylist.id} />
					</div>
				</div>
			</div>
    	</div>
  );
  }
