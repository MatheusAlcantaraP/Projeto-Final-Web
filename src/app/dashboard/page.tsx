import "@/app/styles/playlist.css";
import { createPlaylist } from "../libs/credentials";
import { isSessionValid } from "@/app/libs/session";
import { redirect } from "next/navigation";
import Link from 'next/link';

export interface PlaylistCredentials{
	nomePl: string,
    imgURL: string,
    estiloPl: string,
    descricaoPL: string,
}

export default async function PaginaPlaylist() {

	const session = await isSessionValid();

	if(!session) 
	{
    	redirect('/login');
	}

  	const playlistfunction = async (formData: FormData) => {
    	'use server'
    
    	const playlistData: PlaylistCredentials = {
    		nomePl: formData.get('nomePlaylist') as string,
    		imgURL: formData.get('urlPlaylist') as string, 
    		estiloPl: formData.get('estiloPlaylist') as string,
    		descricaoPL: formData.get('descricaoPlaylist') as string,
    	}

    	const CreatePlaylistResult = await createPlaylist(playlistData);
  
    	if(CreatePlaylistResult.success)
    	{
      		redirect(`/dashboard/playlists/`);
    	}
  	}

	return(
		<div>
			<div>
				<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lexend+Giga:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
			</div>
			<div className="containerHeader">
				<h1 className="tituloPrincipal">Crie suas Playlists!</h1>
				<Link href={`/dashboard/playlists`}>
				<button className="btnPlaylist" aria-label="Adicionar playlist">Já possui uma playlist? Clique para vê-la!</button>
				</Link>
			</div>
			<div className="containerPrincipal"> 
				<form className="containerPlaylist" action={playlistfunction}>
					<input name="nomePlaylist"  id='nomePlaylist' className="inputs" placeholder="Nome da Playlist" required />
					<input name="urlPlaylist"  id='urlPlaylist'className="inputs" placeholder="URL da Imagem" required/>
					<input name="estiloPlaylist"  id='estiloPlaylist' className="inputs" placeholder="Estilo Musical" required/>
					<input name="descricaoPlaylist"  id='descricaoPlaylist' className="inputs" placeholder="Descrição da playlist" required/>
					<button type="submit" className="btnCriarPlaylist">Criar Playlist</button>
				</form>
			</div>
		</div>
	);
}