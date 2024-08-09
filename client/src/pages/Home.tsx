// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchData } from '../services/api';

const Home: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData('some-endpoint');
        setData(result.message);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h2>Bem-vindo ao Meu Projeto</h2>
        <p>Dados da API: {data || 'Carregando...'}</p>
      </main>
    </div>
  );
}

export default Home;

