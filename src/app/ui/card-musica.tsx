'use client'

import "@/app/styles/playlistShow.css";
import Link from "next/link";

const arquivo = 'db-playlist.json';
const dbMusicasPath = "db-musicas.json";

export interface MusicaProps {
  nome: string;
  artista: string;
  preview: string;
  capa: string;
  genero: string;
  duracao: string;
  id: string;
  playlistID: []
}

export default function Musica(props: MusicaProps) {


  return (
    <div>
        
    </div>
  
)
}
