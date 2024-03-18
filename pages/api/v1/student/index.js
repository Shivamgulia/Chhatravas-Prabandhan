// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from "mysql2/promise";

import verifyToken from "@/components/jwt/verifyToken";
import dbConfig from "@/assets/database/db";

export default async function handler(req, res) {
  const token = req.headers.authorization;

  console.log(token);

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }

  const rows = 10;
  const page = req.body.page;
  const hostel = req.body.hostel;

  const offset = (page - 1) * rows;

  if (!hostel) {
    return res.status(400).json({ message: "Hostel parameter is required" });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const query = `SELECT * FROM students WHERE hostel = "${hostel}" AND active = 1 LIMIT ${rows} OFFSET ${offset}`;

    const [students] = await connection.execute(query);

    const [count] = await connection.execute(
      `SELECT COUNT(*) as count FROM students WHERE hostel = "${hostel}" AND active = 1;`
    );

    await connection.end();

    const pages = Math.ceil(count[0].count / rows);

    res.status(200).json({ students, pages });
  } catch (error) {
    console.error("MySQL error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
