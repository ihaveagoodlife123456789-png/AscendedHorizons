import express from 'express';
import { pool } from '../index.js'

export const cartRouter = express.Router()

cartRouter.post('/', async (req, res) => {
    const { id } = req.body
    try {
        if(!req.user) {
            res.status(400).json({ message: 'Please login first'})
        }
        const query = `SELECT cart FROM users WHERE id = $1`
        const user = [req.user.id]
        const result = await pool.query(query, user)
        if(!result) {
           res.status(400).json({ message: 'Something went wrong.'}) 
        }
        const queryCart = `UPDATE carts
                           SET items = array_append(items, $1)
                           WHERE id = $2 RETURNING *`
        const userCart = [id, req.user.id]
        const resultCart = await pool.query(queryCart, userCart)
        if (!resultCart) {
            res.status(400).json({ message: 'Something went wrong.'}) 
        }
        res.status(200).json({ message: resultCart}) 
    } catch (err) {
        res.status(400).json({ message: 'Something went wrong.'})
    }
})