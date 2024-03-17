// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from "mysql2/promise";

import verifyToken from "@/components/jwt/verifyToken";
import dbConfig from "@/assets/database/db";

export default async function handler(req, res) {
  if (req.method != "POST") {
    return res.status(405).json({ message: "Method not Allowed" });
  }

  const token = req.headers.authorization;

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }

  console.log(token);

  const { name, rollno, reason, hostel, startdate, enddate } = req.body;

  console.log(req.body);

  if (!name || !rollno || !reason || !hostel || !startdate || !enddate) {
    return res.status(400).json({ message: "All parameter is required" });
  }

  const db = await mysql.createConnection(dbConfig);
  db.connect();

  try {
    const query = `
    INSERT INTO \`leave\`
    (applicant, hostel, reason, startdate, enddate, rollno, status)
    VALUES
    (?, ?, ?, ?, ?, ?, "Pending")
    `;

    const queryParams = [name, hostel, reason, startdate, enddate, rollno];

    const problem = await db.execute(query, queryParams);
    console.log(problem);
    res.status(201).json({ id: problem[0].insertId });
  } catch (error) {
    db.end();
    console.error("MySQL error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    db.end();
  }
}
