'use client';

import BuscaMusicas from "@/app/ui/busca-musica";

interface Props {
  playlistId: string;
}

export default function EditPlaylistClient({ playlistId }: Props) {

  return (
    <div>
      <h2>Buscar músicas</h2>
      <BuscaMusicas/>
    </div>
  );
}