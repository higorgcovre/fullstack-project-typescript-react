import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Configurar o transportador de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Se tudo estiver certo, gerar um token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

// Criar usuário
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const userRepository = AppDataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password: hashedPassword });
    await userRepository.save(user);

    res.status(201).json({ message: 'Usuário criado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};


// Verificar token
export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    res.json({ message: 'Token válido' });
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

// Ler usuários
export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

// Atualizar usuário
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: Number(id) });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    user.name = name;
    user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await userRepository.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};

// Deletar usuário
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: Number(id) });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await userRepository.remove(user);
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Busca o repositório do TypeORM
    const userRepository = AppDataSource.getRepository(User);

    // Encontre o usuário pelo id
    const user = await userRepository.findOneBy({ id: parseInt(id) });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

