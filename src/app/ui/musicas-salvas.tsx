'use client';

import "@/app/styles/api-mostra.css";
import { useEffect, useState } from 'react';

interface Musica {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
}

export default function MusicasSalvas({ playlistId }: { playlistId: string }) {
  const [musicas, setMusicas] = useState<Musica[]>([]);

  useEffect(() => {
    async function carregarMusicas() {
      const res = await fetch(`/api/musicas?playlistID=${playlistId}`);
      const data = await res.json();
      setMusicas(data.musicas || []);
    }

    carregarMusicas();
  }, [playlistId]);

  return (
    <div className="containerDireita1">
        <div className="containerMusicas">
        <ul className="ulMusica">
            {musicas.map((musica) => (
            <li key={musica.trackId} className="ilMusica">
                <img className="imgMusica"src={musica.artworkUrl100} alt={musica.trackName} width={60} />
                <p className="pMusica">{musica.trackName} – {musica.artistName}</p>
            </li>
            ))}
        </ul>
        </div>
    </div>
  );
}