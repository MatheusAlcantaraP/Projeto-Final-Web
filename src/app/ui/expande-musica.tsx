'use client';

import { useEffect, useState } from 'react';

interface Musica {
    trackId: number;
    trackName: string;
    artistName: string;
    artworkUrl100: string;
    previewUrl: string;
    collectionName: string;
    primaryGenreName: string;
    
}

export default function MusicasExpandidas({ playlistId }: { playlistId: string }) {
    const [musicas, setMusicas] = useState<Musica[]>([]);

    useEffect(() => {
    async function carregarMusicas() {
        const res = await fetch(`/api/musicas?playlistID=${playlistId}`);
        const data = await res.json();
        setMusicas(data.musicas || []);
    }

    carregarMusicas();
    }, [playlistId]);

    const handleRemove = async (trackId: number) => {
    const res = await fetch(`/api/musicas?trackId=${trackId}`, {
    method: 'DELETE',
    });

    if (res.ok) {
        setMusicas((prev) => prev.filter((m) => m.trackId !== trackId));
    } 
    else{
        console.error("Erro ao remover música");
    }
};
    
    return (
        <div>
            <div className="expandebox">
                <div className="musicaBOX">
                    <ul>
                        {musicas.map((m) => (
                        <li key={m.previewUrl} style={{ marginBottom: "1rem" }}>
                            <div className="mscINFO">
                                <div className='mainINFO'>
                                    <img src={m.artworkUrl100} alt={m.trackName} />
                                    <div className='escritoINFO'>
                                        <p className="mscNOME">{m.trackName} - {m.artistName}</p>
                                        <p className="mscALBUM">{m.collectionName}</p>
                                        <p className='mscGENERO'>{m. primaryGenreName}</p>
                                    </div>
                                </div>
                                <div className="rmvBTNbox">
                                    <button className="rmvMusicBTN" onClick={() => handleRemove(m.trackId)}>❌</button>
                                </div>
                                <div className="mscPREVIEW">
                                    <audio controls src={m.previewUrl} />
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}