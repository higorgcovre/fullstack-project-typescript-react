import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  width: 380px;
  height: 300px;
  border: 1px solid #444;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  margin-bottom: 20px; 
`;

const ModalTitle = styled.h2`
  color: #fff;
  font-size: 18px; 
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 20px; 
  position: absolute;
  top: 10px;
  right: 10px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px; 
  text-align: left; 
`;

const Label = styled.label`
  display: block;
  color: #fff;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: calc(100% - 16px);
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  margin: 0;
  display: block;
  text-align: left;
  &:disabled {
    background-color: #222;
  }
`;

const ActionButton = styled.button`
  width: 45%; 
  padding: 8px;
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  font-weight: bold; 
  display: inline-block;
  margin: 5px; 
`;

const SaveButton = styled(ActionButton)`
  background-color: #fff;
`;

const DeleteButton = styled(ActionButton)`
  background-color: #8B0000; 
  color: #ff4d4d; 
`;

const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ConfirmationModal = styled.div`
  background-color: #121212;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 300px;
  text-align: center; 
`;

const ConfirmationText = styled.p`
  color: #fff;
  margin-bottom: 10px;
  font-size: 18px;
`;

const WarningText = styled.p`
  color: #bbb;
  font-size: 14px; 
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center; 
  gap: 10px; 
`;

const ProfileModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userId = useAuthStore((state) => state.userId);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) {
        console.log('userId is null or undefined');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5002/api/users/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        alert('Erro ao carregar informações do usuário.');
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleUpdate = async () => {
    if (userInfo && userId) {
      try {
        await axios.put(`http://localhost:5002/api/users/${userId}`, userInfo);
        alert('Usuário atualizado com sucesso');
        onClose();
      } catch (error) {
        alert('Erro ao atualizar usuário.');
      }
    }
  };

  const handleDelete = async () => {
    if (userId) {
      try {
        await axios.delete(`http://localhost:5002/api/users/${userId}`);
        alert('Usuário deletado com sucesso');
        setAuthenticated(false);
        onClose();
      } catch (error) {
        alert('Erro ao excluir usuário.');
      }
    }
  };

  if (!userInfo) return null;

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Preferências da conta</ModalTitle>
        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalHeader>
      <InputGroup>
        <Label>Nome do usuário:</Label>
        <Input
          value={userInfo.name}
          onChange={(e) => setUserInfo((prev) => prev ? { ...prev, name: e.target.value } : prev)}
        />
      </InputGroup>
      <InputGroup>
        <Label>E-mail:</Label>
        <Input
          value={userInfo.email}
          disabled
        />
      </InputGroup>
      <div>
        <SaveButton onClick={handleUpdate}>Salvar alterações</SaveButton>
        <DeleteButton onClick={() => setShowConfirmation(true)}>Deletar</DeleteButton>
      </div>

      {showConfirmation && (
        <ConfirmationOverlay>
          <ConfirmationModal>
            <ConfirmationText>Encerramento da conta</ConfirmationText>
            <WarningText>Ao deletar sua conta, todos os seus dados serão excluídos. Deseja Prosseguir?</WarningText>
            <ButtonGroup>
              <ActionButton onClick={handleDelete} style={{ backgroundColor: '#8B0000', color: '#ff4d4d' }}>
                Deletar
              </ActionButton>
              <ActionButton onClick={() => setShowConfirmation(false)} style={{ backgroundColor: '#fff', color: '#000' }}>
                Cancelar
              </ActionButton>
            </ButtonGroup>
          </ConfirmationModal>
        </ConfirmationOverlay>
      )}
    </ModalContainer>
  );
};

export default ProfileModal;
