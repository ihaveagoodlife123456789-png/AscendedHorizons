import express from 'express';
import { pool } from '../index.js';

import bcrypt from 'bcrypt';
import validator from 'validator';

export const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
    const { password, email, firstName, lastName } = req.body;
    try {
        if (!firstName || !lastName || !password || !email) {
            console.log(firstName, lastName, password, email)
            return res.status(400).json({ message: 'All fields are required.'});
        }
        const validEmail = email.trim().toLowerCase();
        if (!validator.isEmail(validEmail)) {
            return res.status(400).json({ message: 'Invalid email address.'});
        }
        if (!validator.isLength(password, { min: 8, max: 20 })) {
            return res.status(400).json({ message: 'Password must be between 8 and 20 characters long.'});
        }
        /*if (!validator.matches(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)) {
            return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'});
        }*/
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const verifyEmail = `SELECT * FROM users WHERE email = $1`;
        const { rows } = await pool.query(verifyEmail, [validEmail]);
        if(rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists.'});
        }
        const query = `INSERT INTO users (password, email, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [ hashedPassword, validEmail, firstName, lastName];
        const result = await pool.query(query, values);
        console.log(result)
        const getUser = `SELECT cart FROM users WHERE email = $1`
        const userEmail = [validEmail]
        const userCartId = await pool.query(getUser, userEmail)
        console.log(userCartId)
        const queryCart = `INSERT INTO carts (id, items) VALUES ($1, $2) RETURNING *`;
        const cartId = [userCartId, ARRAY[1]]
        const newCartId = await pool.query(queryCart, cartId)
        return res.status(201).json({ message: 'User registered successfully.', user: result.rows[0] });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server Error'})
    }
})
