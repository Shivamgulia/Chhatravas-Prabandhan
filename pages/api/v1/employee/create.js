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
    const employee = req.body;
    if (!employee.name || !employee.job || !employee.hostel) {
      return res.status(400).json({ message: 'All parameter is required' });
    }

    try {
      const connection = await mysql.createConnection(dbConfig);

      const query = `INSERT INTO \`employees\`
            (\`name\`, \`hostel\`, \`job\`)
            VALUES
            ('${employee.name}', '${employee.hostel}', '${employee.job}');`;

      console.log(query);

      await connection.execute(query);

      await connection.end();

      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error('MySQL error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
