import { hashSync } from 'bcrypt';
import mysql from 'mysql2/promise';
import dbConfig from '@/assets/database/db';
import verifyToken from '@/components/jwt/verifyToken';

export default async function handler(req, res) {
  const token = req.headers.authorization;

  console.log(token);

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: 'All Fields are required' });
  }

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    const query = 'SELECT * FROM users WHERE email = ? ;';
    const values = [email];

    const [existingUsers] = await connection.execute(query, values);

    if (existingUsers.length === 0) {
      return res
        .status(409)
        .json({ message: 'No User with this email exists' });
    }

    const hashedPassword = hashSync(password, 10);

    const query1 = `UPDATE \`users\`
      SET \`password\` = "${hashedPassword}"
      WHERE \`id\` = ${existingUsers[0].id} ;`;

    const values1 = [];

    await connection.execute(query1, values1);

    await connection.end();

    res.status(201).json({ message: 'Password Updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
