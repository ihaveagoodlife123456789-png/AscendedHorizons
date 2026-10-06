import express from 'express';
import { pool } from '../index.js'

export const cartRouter = express.Router()

cartRouter.post('/', async (req, res) => {
    const { itemId } = req.body
    try {
        if(!req.user) {
            return res.status(401).json({ message: 'Please login first'})
        }
        const query = `SELECT cart FROM users WHERE id = $1`
        const user = [req.user.id]
        console.log(req.user)
        const result = await pool.query(query, user)
        if(!result) {
           return res.status(400).json({ message: 'Something went wrong.'}) 
        }
        const queryCart = `UPDATE carts
                           SET items = array_append(items, $1)
                           WHERE id = $2 RETURNING *`
        const userCart = [itemId, req.user.id]
        const resultCart = await pool.query(queryCart, userCart)
        res.status(200).json({ message: resultCart}) 
    } catch (err) {
        res.status(400).json({ message: 'Something went wrong.'})
    }
})

/*cartRouter.post('/delete', async (req, res) => {
    const itemId = Number(req.body.itemId)
    try {
        if(!req.user) {
            return res.status(400).json({ message: 'Please login first.'}) 
        }
        const queryCarts = `SELECT items FROM carts WHERE id = $1`
        const getUser = [req.user.id] 
        const { rows } = await pool.query(queryCarts, getUser)
        if (!rows[0].items.length > 0) {
            return res.status(400).json({ message: 'Basket is empty.'})
        }
        const items = [...rows[0].items]
        console.log(items)
        console.log(itemId)
        const index = items.indexOf(itemId)
        if (index === -1) {
            return res.status(400).json({ message: 'Item already removed.'})
        }
        items.splice(index, 1)
        const deleteItem = await pool.query(`UPDATE carts SET items = $1 WHERE id = $2`, [items, req.user.id])
        res.status(200).json({ message: 'Item deleted successfully.'})
    } catch (error) {
        res.status(500).json({ message: 'Server Error'})
    }
})*/

cartRouter.get('/', async (req, res) => {
    try {
        if(!req.user) {
            return res.status(401).json({ message: 'Please login first' })
        }
        const queryUserCart = `SELECT items FROM carts WHERE id = $1`
        const userId = req.user.id
        const userCart = await pool.query(queryUserCart, [userId])
        if(!userCart.rows[0].items > 0) {
            return res.status(400).json({ message: 'Your cart is empty. :(' })            
        }
        const items = userCart.rows[0].items
        const getCartItems = await Promise.all(
            items.map(async (id) => {
            const getItem = `SELECT * FROM items WHERE id = $1`
            const itemId = [id]
            const result = await pool.query(getItem, itemId)
            const itemObject = result.rows[0]
            return itemObject
        }))
        res.status(200).json(getCartItems)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error.' })  
    }
})