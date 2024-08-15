const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

// Função para buscar dados da API
export const fetchData = async (endpoint: string) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API');
  }
  return response.json();
};

// Função de login
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Erro ao fazer login');
  }
  return response.json();
};

// Função para buscar um usuário pelo ID
export const fetchUserById = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar usuário');
  }
  return response.json();
};

// Função para atualizar um usuário
export const updateUser = async (id: number, userData: { name: string; email: string }) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar usuário');
  }
  return response.json();
};

// Função para buscar todos os usuários
export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Erro ao buscar usuários');
  }
  return response.json();
};

// Função para deletar um usuário
export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar usuário');
  }
  return response.json();
};

// Função para registrar um usuário
export const registerUser = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    throw new Error('Erro ao registrar usuário');
  }
  return response.json();
};

// // Função para verificar o token de validação
// export const verifyToken = async (token: string) => {
//   const response = await fetch(`${API_URL}/verify-token`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ token }),
//   });
//   if (!response.ok) {
//     throw new Error('Erro ao verificar token');
//   }
//   return response.json();
// };
