import express from 'express'
import Stripe from 'stripe'
import { pool } from '../index'

export const paymentRouter = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const domain = await stripe.paymentMethodDomains.create({
    domain_name: 'ascendedhorizons.com'
})

paymentRouter.post('/', async (req, res) => {
    try {
        if(!req.user) {
            res.status(400).json({ message: 'Please login first.' })
        }
        const { rows } = pool.query(`SELECT items FROM carts WHERE id = $1`, [req.user.id])
        if(!rows[0].items > 0) {
            res.status(400).json({ message: 'Cart empty.' })
        }
        const cartArray = rows[0].items
        const totalCost = cartArray.reduce((previous, current) => {
            return previous + current
        }, 0)
        const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost,
        currency: 'cad'
    })
    res.json({
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret
    })
    } catch (error) {

    }
})