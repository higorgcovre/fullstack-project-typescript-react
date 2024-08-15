// src/components/Header.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../store/authStore';
import LoginModal from './LoginModal';
import ProfileModal from './ProfileModal';
import { FaUserCircle } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  background: #333;
  color: #fff;
  position: relative;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 24px;
  position: relative;
  margin-left: 10px;
`;

const DropdownMenu = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  background: #333;
  border: 1px solid #444;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 150px;
  z-index: 1000;
`;

const DropdownItem = styled(Button)`
  display: block;
  padding: 10px;
  text-align: left;
  width: 100%;
  border: none;
  background: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

const Header: React.FC = () => {
  const { isAuthenticated, setAuthenticated, userId } = useAuthStore();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLoginClick = () => setLoginModalOpen(true);
  const handleProfileClick = () => setProfileModalOpen(true); // Abre o modal de perfil
  const handleLogoutClick = () => {
    setAuthenticated(false);
    setDropdownOpen(false);
  };
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <HeaderContainer>
      {isAuthenticated ? (
        <>
          <IconButton onClick={toggleDropdown}>
            <FaUserCircle />
          </IconButton>
          <DropdownMenu open={isDropdownOpen}>
            <DropdownItem onClick={handleProfileClick}>Perfil</DropdownItem>
            <DropdownItem onClick={handleLogoutClick}>Sair</DropdownItem>
            {isProfileModalOpen && <ProfileModal onClose={() => setProfileModalOpen(false)} />}
          </DropdownMenu>
        </>
      ) : (
        <Button onClick={handleLoginClick}>Login</Button>
      )}
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
    </HeaderContainer>
  );
};

export default Header;
