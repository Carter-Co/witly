// import { pool } from '../db.js';
// import bcrypt from 'bcrypt';
// export const createUser = async function (user) {
//     try {let sql = `INSERT INTO users (username, password) VALUES ($1,$2)`;
//         let password = user.password;
//         const saltRounds = 10;
//     const hash = await bcrypt.hash(password, saltRounds);
//     let values = [user.username, hash];
//     let result = await pool.query(sql, values);
// return result;
// } catch (error) {
//     console.log(error.stack);
// }
// };

import bcrypt from 'bcrypt';
import { pool } from '../db.js';

export const createUser = async function (user) {
    try {
        let sql = `INSERT INTO users (username, password) VALUES ($1, $2)`;
        let password = user.password;

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        let values = [user.username, hash];
        let result = await pool.query(sql, values);
        return result;
    } catch (error) {
        console.log(error.stack);
    }
};