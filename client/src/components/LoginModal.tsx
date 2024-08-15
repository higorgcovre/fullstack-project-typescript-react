import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import  { jwtDecode } from 'jwt-decode'; 
import RegisterModal from './RegisterModal';
import { useAuthStore } from '../store/authStore';

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #121212;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 300px;
  height: 380px;
  border: 1px solid #444;
  z-index: 1000;
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 5px;
`;

const ModalTitle = styled.h2`
  color: #fff;
`;

const ModalSubtitle = styled.p`
  color: #ccc;
  font-size: 12px; 
  margin-top: -10px;
  text-align: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  color: #fff;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  margin: 0 auto;
  display: block;
  text-align: center;
`;

const ActionButton = styled.button`
  width: 90%; 
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: #fff;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 40px;
  margin-bottom: 50px;
`;

const Link = styled.a`
  color: #fff; 
  cursor: pointer;
  display: block;
  margin-top: 15px;
  text-align: center;

  & > span {
    font-weight: bold;
  }
`;

const LoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUserId = useAuthStore((state) => state.setUserId);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/login', { email, password });
      const { token } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
        
        const decodedToken = jwtDecode<{ id: number }>(token);
        const userId = decodedToken.id;

        console.log('userID depois do login:', userId);
        setAuthenticated(true);
        setUserId(userId);
        onClose();
      }
    } catch (error) {
      alert('Erro ao fazer login.');
    }
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    onClose(); 
    setTimeout(() => {
      setShowRegister(true);
    }, 100);
  };

  return (
    <ModalContainer>
      <CloseButton onClick={onClose}>X</CloseButton>
      <ModalHeader>
        <ModalTitle>{showRegister ? 'Crie sua conta' : 'Acesse sua conta'}</ModalTitle>
      </ModalHeader>
      {!showRegister ? (
        <>
          <ModalSubtitle>Bem vindo de volta! Entre com seus dados.</ModalSubtitle>
          <InputGroup>
            <Label>E-mail:</Label>
            <Input 
              placeholder="Digite seu e-mail aqui" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </InputGroup>
          <InputGroup>
            <Label>Senha:</Label>
            <Input 
              type="password" 
              placeholder="Digite sua senha aqui"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </InputGroup>
          <ActionButton onClick={handleLogin}>Fazer login</ActionButton>
          <Link onClick={() => setShowRegister(true)}>
            Não tem uma conta ainda? <span className="link-text">Criar conta.</span>
          </Link>

        </>
      ) : (
        <RegisterModal onClose={() => setShowRegister(false)} onRegisterSuccess={handleRegisterSuccess} />
      )}
    </ModalContainer>
  );
};

export default LoginModal;
