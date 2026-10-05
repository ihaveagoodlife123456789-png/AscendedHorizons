import express from 'express';
import { pool } from '../index.js'

export const cartRouter = express.Router()

cartRouter.post('/', async (req, res) => {
    const { id } = req.body
    console.log(id)
    try {
        if(!req.user) {
            res.status(401).json({ message: 'Please login first'})
        }
        const query = `SELECT cart FROM users WHERE id = $1`
        const user = [req.user.id]
        console.log(req.user)
        const result = await pool.query(query, user)
        console.log(result)
        if(!result) {
           res.status(400).json({ message: 'Something went wrong.'}) 
        }
        const queryCart = `UPDATE carts
                           SET items = array_append(items, $1)
                           WHERE id = $2 RETURNING *`
        const userCart = [id, req.user.id]
        const resultCart = await pool.query(queryCart, userCart)
        console.log(resultCart)
        if (!resultCart) {
            res.status(400).json({ message: 'Something went wrong.'}) 
        }
        res.status(200).json({ message: resultCart}) 
    } catch (err) {
        res.status(400).json({ message: 'Something went wrong.'})
    }
})

cartRouter.get('/', async (req, res) => {
    try {
        if(!req.user) {
            res.status(401).json({ message: 'Please login first' })
        }
        const queryUserCart = `SELECT items FROM carts WHERE id = $1`
        const userId = req.user.id
        const userCart = await pool.query(queryUserCart, [userId])
        console.log(userCart)
        if(!userCart.rows.length > 0) {
            res.status(200).json({ message: 'Your cart is empty. :(' })            
        }
        res.status(200).json({ message: userCart.rows })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error.' })  
    }
})