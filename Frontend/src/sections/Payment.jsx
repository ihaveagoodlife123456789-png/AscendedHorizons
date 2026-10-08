import { Navigation } from './components/Navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'

import { PaymentForm } from './PaymentElement'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export function StripePayment() {
    const [ clientSecret, setClientSecret ] = useState(null)
    const [ paymentIntentMessage, setPaymentIntentMessage ] = useState(null)
    useEffect(() => {
        async function getPaymentIntent() {
        try {
            const response = await fetch('/api/cart/checkout', {
                method: 'POST'
            })
            const result = await response.json()
            if(!response.ok) {
                setPaymentIntentMessage(result.message)
                return;
            }
            setClientSecret(result.client_secret)
        } catch (error) {
            setPaymentIntentMessage(true)
        }    
        }
        getPaymentIntent()
    }, [])
    const appearance = {
    theme: 'night'
  }
  if (paymentIntentMessage) {
    return <div className='bg-red-300 p-4 text-red-800'>Failed to load checkout session.</div>;
  }

  if (!clientSecret) {
    return <div className='bg-gray-100 p-4'>Loading checkout setup...</div>;
  }
    return (
        <div className='size-full'>
            <Navigation />
            <div className='relative w-full h-[90%] bg-white'>
                <div className='w-full h-[8%] bg-slate-500 absolute top-0'></div>
                <div className='w-full h-[86%] flex'>
                    <div className='w-[65%] h-full flex justify-center items-center overflow-scroll'>
                        <Elements stripe={stripePromise} options={{ clientSecret, appearance}}>
                            <PaymentForm />
                        </Elements>
                    </div>
                    <div className='w-[35%] h-full flex justify-center items-center'>
                        <div className='size-[80%] bg-slate-300'></div>
                    </div>
                </div>
                <div className='w-full h-[6%] bg-slate-700 absolute bottom-0'></div>
            </div>
        </div>
    )
}