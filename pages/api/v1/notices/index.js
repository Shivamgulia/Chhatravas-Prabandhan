// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2/promise';

import verifyToken from '@/components/jwt/verifyToken';
import dbConfig from '@/assets/database/db';

export default async function handler(req, res) {
  const token = req.headers.authorization;

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }

  if (req.method === 'GET') {
    let connection;

    try {
      connection = await mysql.createConnection(dbConfig);

      const query = `SELECT * FROM notices LIMIT 6;`;

      const [notices] = await connection.execute(query);

      await connection.end();

      res.status(200).json({ notices });
    } catch (error) {
      console.error('MySQL error:', error);
      await connection.end();
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    let connection;

    const { head, details } = req.body;

    if (!head || !details) {
      return res.status(400).json({ message: 'Missing Fields' });
    }

    try {
      connection = await mysql.createConnection(dbConfig);

      const query = `INSERT INTO notices (head, details) VALUES (?, ?);`;

      const [result] = await connection.execute(query, [head, details]);

      await connection.end();

      res.status(200).json({ message: 'Notice added successfully' });
    } catch (error) {
      console.error('MySQL error:', error);
      await connection.end();
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
