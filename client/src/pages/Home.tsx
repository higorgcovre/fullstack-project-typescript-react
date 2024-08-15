// src/pages/Home.tsx
import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import HomeContent from '../components/HomeContent';

const HomeContainer = styled.div`
  padding-top: 50px; /* Ajuste conforme a altura do cabeçalho */
  text-align: center; /* Centraliza o texto da nova seção */
`;

const AdditionalSection = styled.section`
  margin: 20px auto;
  padding: 20px;
  max-width: 800px;
  background-color: #222;
  border-radius: 8px;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Header />
      <HomeContent />
      {/* Nova seção adicionada */}
      <AdditionalSection>
        <Title>Descubra Mais Filmes.</Title>
        <Description>
          Explore nossos filmes e fique por dentro de todas as novidades no mundo do cinema. Para mais informações clique eu saiba mais.
        </Description>
        <ActionButton onClick={() => alert('Saiba mais sobre as funcionalidades!')}>Saiba Mais</ActionButton>
      </AdditionalSection>
    </HomeContainer>
  );
};

export default Home;
