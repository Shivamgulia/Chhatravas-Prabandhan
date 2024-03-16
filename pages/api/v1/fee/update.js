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

  const connection = await mysql.createConnection(dbConfig);
  if (req.method === 'POST') {
    try {
      // Extract data from the request body
      const { image, textInput } = req.body;

      // Convert base64 image to buffer
      console.log(imageBuffer);

      // Execute the INSERT query
      const query = `
      INSERT INTO your_table_name
      (image, text_input)
      VALUES
      (${image}, ${textInput})
      `;

      const fee = await connection.execute(query);

      res.status(200).json({ fee });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await connection.end();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
