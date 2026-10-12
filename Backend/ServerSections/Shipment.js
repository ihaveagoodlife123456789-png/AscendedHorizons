import express from 'express'
import { pool } from '../index.js'

export const shipmentRouter = express.Router()

shipmentRouter.post('/', (req, res) => {
  const { shipping } = req.body
  try {
    console.log(shipping)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error.'})
  }
})

//Shippo apiTestKey = process.env.SHIPPO_TEST_KEY
