// // pages/api/login.js

// import mysql from 'mysql2/promise';
// import { compareSync } from 'bcrypt';
// import { sign } from 'jsonwebtoken';
// import dbConfig from '../../../assets/database/db';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   const { email, password } = req.body;

//   console.log(email, password);

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   let connection;
//   try {
//     connection = await mysql.createConnection(dbConfig);

//     const [rows] = await connection.execute(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );

//     if (rows.length === 0) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const user = rows[0];

//     if (!compareSync(password, user.password)) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     if (user.rollno != 0) {
//       const [student] = await connection.execute(
//         'SELECT * FROM students WHERE rollno = ? AND active = 1;',
//         [user.rollno]
//       );

//       if (student[0]) {
//         const token = sign(
//           { userId: user.id, userEmail: user.email },
//           'havefuneveryone',
//           {
//             expiresIn: '365d',
//           }
//         );

//         await connection.end();

//         user.password = undefined;

//         res
//           .status(200)
//           .json({ user: { ...student[0], email: user.email }, token });
//       } else {
//         const token = sign(
//           { userId: user.id, userEmail: user.email },
//           'havefuneveryone',
//           {
//             expiresIn: '365d',
//           }
//         );

//         await connection.end();

//         user.password = undefined;

//         res.status(200).json({ user, token });
//       }
//     }
//     const token = sign(
//       { userId: user.id, userEmail: user.email },
//       'havefuneveryone',
//       {
//         expiresIn: '365d',
//       }
//     );

//     await connection.end();

//     user.password = undefined;

//     res.status(200).json({ user, token });
//   } catch (error) {
//     console.log('error');
//     console.log(error);
//     console.error('MySQL error:', error);
//     await connection.end();
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
//   res.status(500).json({ message: 'Method not allowed' });
// }

import mysql from 'mysql2/promise';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import dbConfig from '../../../assets/database/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];

    if (!compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.rollno != 0) {
      const [student] = await connection.execute(
        'SELECT * FROM students WHERE rollno = ? AND active = 1;',
        [user.rollno]
      );

      if (student[0]) {
        const token = sign(
          { userId: user.id, userEmail: user.email },
          'havefuneveryone',
          {
            expiresIn: '365d',
          }
        );

        user.password = undefined;

        return res
          .status(200)
          .json({ user: { ...student[0], email: user.email }, token });
      }
    }

    const token = sign(
      { userId: user.id, userEmail: user.email },
      'havefuneveryone',
      {
        expiresIn: '365d',
      }
    );

    user.password = undefined;

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('MySQL error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
