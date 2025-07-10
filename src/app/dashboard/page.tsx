import "@/app/styles/playlist.css";
import { createPlaylist } from "../libs/credentials";
import { redirect } from "next/navigation";

export interface PlaylistCredentials{
    nomePl: string,
    imgURL: string,
    estiloPl: string,
}

export default function PaginaPlaylist() {

  const playlistfunction = async (formData: FormData) => {
    'use server'
    
    const playlistData: PlaylistCredentials = {
      nomePl: formData.get('nomePlaylist') as string,
      imgURL: formData.get('urlPlaylist') as string, 
      estiloPl: formData.get('estiloPlaylist') as string,

    }

    const CreatePlaylistResult = await createPlaylist(playlistData);
  
    if(CreatePlaylistResult.success)
    {
      redirect(`/dashboard/playlists/`);
    }

  }

  return (
    <div>
      <div className="containerHeader">
        <h1 className="tituloPrincipal">Página para criar as suas Playlists!</h1>
        <button className="btnPlaylist" aria-label="Adicionar playlist">&#10010;</button>
      </div>

      <div className="containerPrincipal"> 
          <form className="containerPlaylist" action={playlistfunction}>
              <input name="nomePlaylist"  id='nomePlaylist' className="inputs" placeholder="Nome da Playlist" required />
              <input name="urlPlaylist"  id='urlPlaylist'className="inputs" placeholder="URL da Imagem" />
              <input name="estiloPlaylist"  id='estiloPlaylist' className="inputs" placeholder="Estilo Musical"/>
              <button type="submit" className="btnCriarPlaylist">Criar Playlist</button>
          </form>
      </div>

    </div>
  );
}