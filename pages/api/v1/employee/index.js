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
    const rows = 10;
    const page = req.body.page;
    const hostel = req.body.hostel;

    const offset = (page - 1) * rows;

    if (!hostel) {
      return res.status(400).json({ message: 'Hostel parameter is required' });
    }

    try {
      const connection = await mysql.createConnection(dbConfig);

      const query = `SELECT * FROM employees WHERE hostel = "${hostel}" LIMIT ${rows} OFFSET ${offset}`;

      console.log(query);

      const [employees] = await connection.execute(query);

      const [count] = await connection.execute(
        `SELECT COUNT(*) as count FROM employees WHERE hostel = "${hostel}"`
      );

      await connection.end();

      console.log(count);

      res
        .status(200)
        .json({ employees: employees, count: count[0].count / 10 });
    } catch (error) {
      console.error('MySQL error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  if (req.method === 'DELETE') {
    const id = req.body.id;

    console.log(id);

    if (!id) {
      return res.status(400).json({ message: 'Hostel parameter is required' });
    }

    try {
      const connection = await mysql.createConnection(dbConfig);

      const query = `DELETE FROM \`employees\`
          WHERE id = ${req.body.id};`;

      await connection.execute(query);

      await connection.end();

      res.status(200).json({ message: 'Employee Deleted Sucessfully' });
    } catch (error) {
      console.error('MySQL error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
