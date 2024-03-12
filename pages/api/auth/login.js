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

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  let connection;
  try {
    console.log('dbconfig');
    connection = await mysql.createConnection(dbConfig);

    console.log('dbconfig');
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    console.log(rows);

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

    user.password = undefined;

    res.status(200).json({ user, token });
  } catch (error) {
    console.log('error');
    console.log(error);
    console.error('MySQL error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
