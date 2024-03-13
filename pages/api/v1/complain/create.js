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
    const complain = req.body;
    if (!complain.complain || !complain.hostel) {
      return res.status(400).json({ message: 'All parameter is required' });
    }

    try {
      const connection = await mysql.createConnection(dbConfig);

      const query = `INSERT INTO \`complains\`
            (\`complain\`, \`hostel\`)
            VALUES
            ('${complain.complain}', '${complain.hostel}');`;

      await connection.execute(query);

      await connection.end();

      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error('MySQL error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
