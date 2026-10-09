import express from 'express'
import Stripe from 'stripe'
import { pool } from '../index.js'

export const paymentRouter = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

/*const domain = await stripe.paymentMethodDomains.create({
    domain_name: 'ascendedhorizons.com'
})*/

paymentRouter.post('/', async (req, res) => {
    try {
        if(!req.user) {
            return res.status(400).json({ message: 'Please login first.' })
        }
        const { rows } = await pool.query(`SELECT items FROM carts WHERE id = $1`, [req.user.id])
        console.log(rows)
        if(!rows[0]?.items?.length) {
            return res.status(400).json({ message: 'Cart empty.' })
        }
        const cartArray = rows[0].items
        console.log(cartArray)
        const totalCost = cartArray.reduce((previous, current) => {
            return previous + current
        }, 0)
        const { rows: orderRows } = await pool.query(`SELECT orders FROM orders WHERE id = $1`, [req.user.id])
        const latestIntentId = orderRows[0]?.orders?.at(-1)
        if(latestIntentId) {
            const existingPaymentId = await stripe.paymentIntents.retrieve(latestIntentId)
            const paymentStatusReusable = ['requires_payment_method', 'requires_confirmation'].includes(existingPaymentId.status)
            if(paymentStatusReusable) {
              await stripe.paymentIntents.update(existingPaymentId.id, { amount: Math.round(totalCost * 100) })
            res.status(200).json({
                id: existingPaymentId.id,
                client_secret: existingPaymentId.client_secret
            })
            return;
            }
        }
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(totalCost * 100),
          currency: 'cad'
        })
        const pushOrderTodatabase = await pool.query(`UPDATE orders SET orders = array_append(orders, $1) WHERE id = $2`, [paymentIntent.id, req.user.id])
    res.json({
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret
    })
    } catch (error) {
        console.log(error)
         return res.status(500).json({ message: 'Cannot initialize checkout.' })
    }
})

// Retrieve a Payment Intent
paymentRouter.post('/retrieve', async (req, res) => {
    const { paymentIntentId } = req.body
    try {
        const paymentRetrieve = await stripe.paymentIntents.retrieve(paymentIntentId);
        res.json({ client_paymentIntents: paymentRetrieve });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/*
// Update a Payment Intent
paymentRouter.post('/update', async (req, res) => {
    try {
        const { paymentIntentId, newAmount  } = req.body
        const paymentUpdate = await stripe.paymentIntents.update(
            paymentIntentId,
            { amount: newAmount }
        )
        console.log(paymentUpdate)
    res.json({client_amount: paymentUpdate.amount})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Cancel a Payment Intent
paymentRouter.post('/cancel', async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        await stripe.paymentIntents.cancel(paymentIntentId);
        res.json({ client_status: 'Cancelled' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
*/

