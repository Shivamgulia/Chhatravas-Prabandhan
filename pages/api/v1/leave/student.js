// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from "mysql2/promise";

import verifyToken from "@/components/jwt/verifyToken";
import dbConfig from "@/assets/database/db";

export default async function handler(req, res) {
  const token = req.headers.authorization;

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }

  const hostel = req.body.hostel;
  const rollno = req.body.rollno;

  if (!hostel) {
    return res.status(400).json({ message: "Hostel parameter is required" });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const query = `SELECT * FROM \`leave\` WHERE hostel = "${hostel}" AND rollno = ${rollno} ORDER BY id DESC ;`;

    const [leaves] = await connection.execute(query);

    await connection.end();

    res.status(200).json({ leaves });
  } catch (error) {
    console.error("MySQL error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
