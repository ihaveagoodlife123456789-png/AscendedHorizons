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
   SET country = $1, state = $2, city = $3, postal_code = $4, address = $5, name = $6 
   WHERE id = $7`, 
  [
    shipping.address.country, 
    shipping.address.state,
    shipping.address.city,
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
    if(rows[0].address === null) {
      return res.status(400).json({ message: 'Please enter address info first.'})
    }
    res.status(200).json({ message: 'Success!'})
  } catch (error) {
    res.status(400).json({ message: 'Server Error.'})
  }
})

shipmentRouter.post('/create', async (req, res) => {
  try {
    if(!req.user) {
      return res.status(400).json({ message: 'Please login first.'})
    }
    const { rows } = await pool.query(`SELECT * FROM userinfo WHERE id = $1`, [ req.user.id ])
    if(rows[0].address === null) {
      return res.status(400).json({ message: 'Please enter address info first.'})
    }
    const { rows: shipmentRow } = await pool.query(`SELECT shipment FROM usershipmentdetails WHERE id = $1`, [ req.user.id ])
    if(shipmentRow[0].shipment !== 0) {
      const getShippo = await shippo.shipments.get(shipmentRow[0].shipment)
      return res.status(200).json(getShippo)
    }
    const addressFrom = {
      name: "Montrealer",
      street1: "Rue Saint-Jacques",
      city: "Montreal",
      state: "QC",
      zip: "H3C1A3",
      country: "CA"
    }
    const addressTo = {
    name: rows[0].name,
    street1: rows[0].address,
    city: rows[0].city,
    state: rows[0].state,
    zip: rows[0].postal_code,
    country: rows[0].country
    };
    const parcel = {
      length: "15",
      width: "10",
      height: "7",
      distanceUnit: "cm",
      weight: "0.8",
      massUnit: "kg"
    }
    const shipment = await shippo.shipments.create({
      addressFrom: addressFrom,
      addressTo: addressTo,
      parcels: [parcel]
    })
    const rates = shipment.rates
    const mapRates = rates.map((rate) => Number(rate.amount))
    const bestRate = Math.min(...mapRates)
    const pushUserShipment = await pool.query(`UPDATE usershipmentdetails SET shipment = $1 WHERE id = $2`, [ shipment.objectId, req.user.id ])
    res.status(200).json(bestRate)
  } catch (error) {
    return res.status(500).json({ message: "Server Error."})
  }
})

//Shippo apiTestKey = process.env.SHIPPO_TEST_KEY, SHIPPO_LIVE_KEY
