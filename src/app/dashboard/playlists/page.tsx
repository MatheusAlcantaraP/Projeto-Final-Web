'use client';

import { useState } from 'react';

//Função incompleta de onde será realizada a página de integração com a API

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&limit=10`);
    const data = await response.json();
    setSongs(data.results);
  };

  return (
    <div>

    </div>
  );
}