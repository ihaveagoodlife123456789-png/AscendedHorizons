import express from 'express'
import { pool } from '../index.js'

export const shipmentRouter = express.Router()

shipmentRouter.post('/', (req, res) => {
  const { shipping } = req.body
  try {
    if(!req.user) {
      return res.status(400).json({ message: 'Please login first.'})
    }
    const insertUserInfo = pool.query(`INSERT INTO userinfo (country, state, postal_code, address, name) VALUES ($1, $2, $3, $4, $5)`, [ shipping.address.country, shipping.address.state, shipping.address.postal_code, shipping.address.line1, shipping.name ])
    res.status(201).json({ message: 'Info created successfully.'})
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error.'})
  }
})

//Shippo apiTestKey = process.env.SHIPPO_TEST_KEY
