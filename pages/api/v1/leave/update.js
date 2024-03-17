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

  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ message: "All parameter is required" });
  }

  const db = await mysql.createConnection(dbConfig);
  db.connect();

  try {
    const query = `
    UPDATE \`leave\`
    SET 
    status = ?
    WHERE id = ?;`;

    const queryParams = [status, id];

    const problem = await db.execute(query, queryParams);

    res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    db.end();
    console.error("MySQL error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    db.end();
  }
}
