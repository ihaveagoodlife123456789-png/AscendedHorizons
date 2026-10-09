import { Navigation } from './components/Navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { use, useEffect, useState } from 'react'

import { PaymentForm } from './PaymentElement'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export function StripePayment() {
    const [ clientSecret, setClientSecret ] = useState(null)
    const [ paymentIntentMessage, setPaymentIntentMessage ] = useState(null)
    const [ userCart, setUserCart ] = useState(null)
    useEffect(() => {
        async function getPaymentIntent() {
        try {
            const [ userCart, payment ] = await Promise.all([
                await fetch('/api/cart', {
                    method: 'GET'
                }),
                await fetch('/api/cart/checkout', {
                  method: 'POST'
                })
            ])
            const resultCart = await userCart.json()
            const resultPayment = await payment.json()
            if(!userCart.ok) {
                setPaymentIntentMessage(resultCart.message)
                return;
            }
            if(!payment.ok) {
                setPaymentIntentMessage(resultPayment.message)
                return;
            }
            setClientSecret(resultPayment.client_secret)
            setUserCart(resultCart)
        } catch (error) {
            setPaymentIntentMessage(true)
        }    
        }
        getPaymentIntent()
    }, [])
    const appearance = { 
        theme: 'stripe',
        variables: { colorText: '#111827', colorBackground: '#ffffff' }
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
                <div className='z-2 w-full h-[8%] bg-slate-500 absolute top-0 text-[42px] font-bold flex justify-start'><h1 className='relative left-[3%]'>Checkout</h1></div>
                <div className='w-full h-[86%] flex overflow-hidden'>
                    <div className='w-[65%] h-full flex justify-center items-center overflow-scroll'>
                        <Elements stripe={stripePromise} options={{ clientSecret, appearance}}>
                            <PaymentForm />
                        </Elements>
                    </div>
                    <div className='w-[35%] h-full flex justify-center items-center'>
                        <div className='size-[80%] bg-slate-300 grid grid-rows-auto grid-cols-1 justify-items-center items-around grid-flow-row overflow-scroll gap-5 relative top-6 scrollbar-thin overflow-x-hidden'>
                            {
                                userCart ?
                                userCart.map((item) => {
                                    return (
                                        <div className='flex flex-col justify-center items-center w-[93%] h-[200px] border-blue-800 border-2 rounded-[8px] bg-center bg-cover' style={{ backgroundImage: `url(${item.imgurl})` }}>
                                            <h1 className='text-[32px] font-bold text-orange-500'>{item.name}</h1>
                                            <h1 className='text-[30px] font-medium text-green-700'>${item.price}</h1>
                                            <h2>{userCart?.message}</h2>
                                        </div>
                                    )
                                })
                                :
                                <h2>Something went wrong.</h2>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full h-[6%] bg-slate-700 absolute bottom-0'></div>
            </div>
        </div>
    )
}