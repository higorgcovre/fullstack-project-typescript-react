import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background: #282c34;
  padding: 20px;
  color: white;
`;

const Header: React.FC = () => (
  <HeaderWrapper>
    <h1>Meu Projeto</h1>
  </HeaderWrapper>
);

export default Header;
