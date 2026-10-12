import express from 'express'
import { pool } from '../index.js'
import { Shippo } from 'shippo'

export const shipmentRouter = express.Router()

const shippo = new Shippo({apiKeyHeader: process.env.SHIPPO_TEST_KEY })

shipmentRouter.post('/', async (req, res) => {
  const { shipping } = req.body
  try {
    if(!req.user) {
      return res.status(400).json({ message: 'Please login first.'})
    }
    console.log(req.user)
    const insertUserInfo = await pool.query(
  `UPDATE userinfo 
   SET country = $1, state = $2, postal_code = $3, address = $4, name = $5 
   WHERE id = $6`, 
  [
    shipping.address.country, 
    shipping.address.state, 
    shipping.address.postal_code, 
    shipping.address.line1, 
    shipping.name, 
    req.user.id
  ]
);
    console.log(req.user.id)
    res.status(201).json({ message: 'Info created successfully.'})
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error.'})
  }
})

shipmentRouter.get('/', async (req, res) => {
  try {
    if(!req.user) {
      return res.status(400).json({ message: 'Please login first.'})
    }
    const { rows } = await pool.query(`SELECT address FROM userinfo WHERE id = $1`, [ req.user.id ])
    if(!rows[0].address) {
      return res.status(400).json({ message: 'Please enter address info first.'})
    }
    res.status(200)
  } catch (error) {

  }
})

shipmentRouter.post('/create', async (req, res) => {
  try {
    if(!req.user) {
      return res.status(400).json({ message: 'Please login first.'})
    }
    const { rows } = await pool.query(`SELECT * FROM userinfo WHERE id = $1`, [ req.user.id ])
    const addressFrom = {
      name: "Montrealer",
      street1: "Rue Saint-Jacques",
      city: "Montreal",
      state: "QC",
      zip: "H3C1A3",
      country: "CA"
    }
    const addressTo = {
    name: "Bob",
    street1: "Sainte-Catherine Street",
    city: "Montreal",
    state: "QC",
    zip: "H3B1B2",
    country: "CA"
};
  } catch {
    
  }
})

//Shippo apiTestKey = process.env.SHIPPO_TEST_KEY, SHIPPO_LIVE_KEY
