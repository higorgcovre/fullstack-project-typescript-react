const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchData = async (endpoint: string) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API');
  }
  return response.json();
};
