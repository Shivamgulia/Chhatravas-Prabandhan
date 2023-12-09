// pages/api/login.js

import mysql from 'mysql2/promise';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
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

    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];

    if (!compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = sign(
      { userId: user.id, userEmail: user.email },
      'havefuneveryone',
      {
        expiresIn: '1h',
      }
    );

    await connection.end();

    res.status(200).json({ token });
  } catch (error) {
    console.error('MySQL error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
