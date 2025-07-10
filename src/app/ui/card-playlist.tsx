'use client'

import "@/app/styles/playlistShow.css";
import Link from "next/link";

const arquivo = 'db-playlist.json';
const dbMusicasPath = "db-musicas.json";

export interface PlaylistProps {
  id: string;
  nome: string;
  url: string;
  estilo: string;
  email: string;
  descricao: string;
  musicasID: []
}

export default function Playlist(props: PlaylistProps) {


  return (
  <div className="containerPlaylistCriada">
    <div key={props.id} className="playlistCriadaBox">
      <img src={props.url || "https://via.placeholder.com/150"} alt={props.nome} className="playlistImage" />
      <div className="playlistInfo">
        <button className="deleteBTN">X</button>
        <h3 className="playlistTitulo">{props.nome}</h3>
        <p className="playlistEstilo">{props.estilo}</p>
        <p className="playlistDescricao">{props.descricao}</p>
        <Link href={`/dashboard/playlists/${props.id}`}>
          <button className="playlistLinkBTN">Editar / Adicionar Músicas</button>
        </Link>
      </div>
    </div>
  </div> 
  
)
}
