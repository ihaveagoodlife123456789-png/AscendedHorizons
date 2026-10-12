import express from 'express'
import { pool } from '../index.js'

export const shipmentRouter = express.Router()

shipmentRouter.post('/', (req, res) => {
  const { shipping } = req.body
  try {
    
  } catch (error) {
    
  }
})

//Shippo apiTestKey = process.env.SHIPPO_TEST_KEY
