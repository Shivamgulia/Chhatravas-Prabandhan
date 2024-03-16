import mysql from 'mysql2/promise';
import xlsx from 'xlsx';

import dbConfig from '@/assets/database/db';
import verifyToken from '@/components/jwt/verifyToken';
import base64ToFile from '@/components/lib/bas64tofile';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};

export default async function handler(req, res) {
  const token = req.headers.authorization;

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }

  if (req.method != 'POST') {
    return res.status(401).json({ message: 'Method not allowed' });
  }

  console.log(req.body.file);
  const excelFile = base64ToFile(req.body.file);
  console.log(excelFile);

  try {
    const workbook = xlsx.readFile(excelFile);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const studentData = xlsx.utils.sheet_to_json(worksheet);

    console.log(studentData, 'data');

    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO students (name, fathername, rollno, branch, hostel, roomno, active) VALUES ?`;

    const processedData = studentData.map((student) => [
      student.name,
      student.fathername,
      student.rollno,
      student.branch,
      student.hostel,
      student.roomno,
      student.active || 1,
    ]);

    await connection.query(sql, [processedData]);
    await connection.end();

    res.status(200).json({ message: 'Students data uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing Excel file.', error });
  }
}

console.log('here');
