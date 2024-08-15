// src/components/HomeContent.tsx
import React from 'react';
import styled from 'styled-components';
import movieImage from '../assets/wolverine.jpeg'; // Ajuste o caminho conforme a localização da imagem

const HomeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  color: #fff;
  text-align: center;
`;

const WelcomeMessage = styled.h1`
  margin-bottom: 20px;
`;

const MovieContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 20px auto;
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const MovieTitle = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
`;

const MovieDescription = styled.p`
  color: #fff;
  margin-top: 10px;
`;

const MovieDetails = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #333;
  border-radius: 8px;
  text-align: center;
`;

const GenreContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const DetailItem = styled.div`
  background-color: #444;
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 14px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Star = styled.span<{ filled: boolean }>`
  font-size: 24px;
  color: ${({ filled }) => (filled ? '#FFD700' : '#333')}; /* Amarelo para estrelas preenchidas e cinza para não preenchidas */
`;

const RatingText = styled.span`
  font-size: 18px;
  color: #fff;
  margin-left: 10px;
`;

const HomeContent: React.FC = () => {
  const rating = 5.0; 

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} filled={true}>★</Star>);
    }

    if (halfStar) {
      stars.push(<Star key="half" filled={true}>★</Star>);
    }

    for (let i = fullStars + (halfStar ? 1 : 0); i < totalStars; i++) {
      stars.push(<Star key={`empty-${i}`} filled={false}>★</Star>);
    }

    return stars;
  };

  return (
    <HomeContentContainer>
      <WelcomeMessage>Bem-vindo ao nosso site!</WelcomeMessage>
      <MovieContainer>
        <MovieImage src={movieImage} alt="Deadpool & Wolverine" />
        <MovieTitle>Deadpool & Wolverine</MovieTitle>
        <MovieDescription>
          Deadpool & Wolverine reúne o icônico mercenário tagarela Wade Wilson (Ryan Reynolds) e o poderoso mutante Wolverine (Hugh Jackman) em uma aventura explosiva, escrita e produzida pelos mesmos talentos por trás de Deadpool (2016) e Deadpool 2 (2018). Wade Wilson desfruta de um momento de aparente calma ao lado de Vanessa (Morena Baccarin) e seus amigos e, em contra partida, Wolverine se recupera de seus ferimentos. Um têm os seus caminhos cruzados com o outro, dando início a uma improvável aliança. Juntos, eles enfrentam um inimigo formidável em comum, desencadeando uma jornada repleta de ação, humor e reviravoltas surpreendentes. Deadpool & Wolverine promete ser uma aventura épica, cheia de referências aos quadrinhos e momentos de pura adrenalina, proporcionando aos fãs uma experiência única e inesquecível no universo dos super-heróis.
        </MovieDescription>
        <MovieDetails>
          <GenreContainer>
            <DetailItem>Ação</DetailItem>
            <DetailItem>Aventura</DetailItem>
            <DetailItem>Comédia</DetailItem>
          </GenreContainer>
          <RatingContainer>
            {renderStars(rating)}
            <RatingText>{rating}</RatingText>
          </RatingContainer>
        </MovieDetails>
      </MovieContainer>
    </HomeContentContainer>
  );
};

export default HomeContent;
