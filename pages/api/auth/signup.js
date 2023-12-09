// pages/api/register.js

import mysql from 'mysql2/promise';
import { hashSync } from 'bcrypt';
import dbConfig from '../../../assets/database/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res
        .status(409)
        .json({ message: 'User with this email already exists' });
    }

    const hashedPassword = hashSync(password, 10);

    await connection.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    await connection.end();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('MySQL error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
