// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2/promise';

import verifyToken from '@/components/jwt/verifyToken';
import dbConfig from '@/assets/database/db';

export default async function handler(req, res) {
  const token = req.headers.authorization;

  console.log(token);

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }

  if (req.method === 'POST') {
    const hostel = req.body.hostel;

    if (!hostel) {
      return res.status(400).json({ message: 'Hostel parameter is required' });
    }
    let connection;

    try {
      connection = await mysql.createConnection(dbConfig);

      const query = `SELECT * FROM menu WHERE hostel_name = "${hostel}" AND active = 1;`;

      const [menu] = await connection.execute(query);

      await connection.end();

      res.status(200).json({ menu });
    } catch (error) {
      console.error('MySQL error:', error);
      await connection.end();
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
