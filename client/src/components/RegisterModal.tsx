// src/components/RegisterModal.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  z-index: 1000;
  border: 1px solid #444;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  color: #fff;
  text-align: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  margin-left: auto;
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
  margin-bottom : 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
`;

const RegisterModal: React.FC<{ onClose: () => void, onRegisterSuccess: () => void }> = ({ onClose, onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não correspondem.');
      return;
    }

    setError(null);

    try {
      await axios.post('http://localhost:5002/api/users', { name, email, password });
      alert('Cadastro realizado com sucesso.');
      onRegisterSuccess();
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      alert('Erro ao criar conta.');
    }
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Crie sua conta</ModalTitle>
        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalHeader>
      <InputGroup>
        <Label>Nome completo</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome completo aqui" />
      </InputGroup>
      <InputGroup>
        <Label>E-mail</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail aqui" />
      </InputGroup>
      <InputGroup>
        <Label>Senha</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha aqui" />
      </InputGroup>
      <InputGroup>
        <Label>Confirme a senha</Label>
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme sua senha aqui" />
      </InputGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ActionButton onClick={handleRegister}>Cadastrar</ActionButton>
    </ModalContainer>
  );
};

export default RegisterModal;
