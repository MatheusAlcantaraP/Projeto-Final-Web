'use client';

import BuscaMusicas from "@/app/ui/busca-musica";
import MusicasSalvas from "@/app/ui/musicas-salvas";
import "@/app/styles/playlistShow.css";

interface Props {
	playlistId: string;
}

export default function MostraPlaylistClient({ playlistId }: Props) {

	return(
		<div className="containerShow">
			<BuscaMusicas playlistId={playlistId}/>
			<MusicasSalvas playlistId={playlistId}/>
		</div>
  	);
}