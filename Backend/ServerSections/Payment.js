import express from 'express'
import Stripe from 'stripe'
import { pool } from '../index.js'

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
    console.log(paymentIntent)
    res.json({
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret
    })
    } catch (error) {

    }
})
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

// Retrieve a Payment Intent
paymentRouter.post('/retrieve', async (req, res) => {
    try {
        const { paymentIntentId } = req.body
        const paymentRetrieve = await stripe.paymentIntents.retrieve(paymentIntentId);
        res.json({ client_amount: paymentRetrieve.amount });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

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
// Confirm a Payment Intent
paymentRouter.post('/confirm', async (req, res) => {
    try {
        const { paymentIntentId, paymentMethodId } = req.body;
        
        const paymentConfirm = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId,
        });
        
        res.json({
            client_status: paymentConfirm.status,
            client_payment_method: paymentConfirm.payment_method
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});