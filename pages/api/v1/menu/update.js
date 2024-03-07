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

  if (req.method === 'POST') {
    const item = req.body;

    if (!item) {
      return res.status(400).json({ message: 'Dependecy Missing' });
    }
    let connection;

    try {
      connection = await mysql.createConnection(dbConfig);

      const query = `UPDATE \`menu\`
        SET
        \`breakfast\` = '${item.breakfast}',
        \`lunch\` = '${item.lunch}',
        \`snack\` = '${item.snack}',
        \`dinner\` = '${item.dinner}'
        WHERE \`id\` = ${item.id};`;

      console.log(query);
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
