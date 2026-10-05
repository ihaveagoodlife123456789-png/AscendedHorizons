import express from 'express'
import { pool } from '../index.js'

export const itemsRouter = express.Router()

itemsRouter.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM items`
        const { rows } = await pool.query(query)
        if (rows.length > 0) {
            return res.status(401).json({ message: 'No results found' })
        }
        return res.status(200).json(rows)
    } catch (err) {
        res.status(401).json({ message: 'No results found' })
    }
})