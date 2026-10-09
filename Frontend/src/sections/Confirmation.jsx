import { Navigation } from './components/Navigation'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function StripePaymentConfirmation() {
    const [searchParams] = useSearchParams()
    const [ userPaymentIntents,  setUserPaymentIntents] = useState(null)
    useEffect(() => {
        async function getPaymentIntentsInfo() {
            const getUserPaymentIntentsId = searchParams.get('payment_intent')
            if (!getUserPaymentIntentsId) {
             setUserPaymentIntents('No payment found.')
              return
            }
        try {
            const [ responsePaymentIntents, responseDeleteCart ] = Promise.All([
                await fetch('/api/cart/checkout/retrieve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentIntentId: getUserPaymentIntentsId })
            })
                await fetch('/api/cart/deleteAll', {
                method: 'DELETE'
                })
            ])
            const resultPaymentIntents = await responsePaymentIntents.json()
            const resultDeleteCart = await responseDeleteCart.json()
            if(!resultPaymentIntents.ok) {
                setUserPaymentIntents("Cannot get user payment info.")
                return
            }
            setUserPaymentIntents(resultPaymentIntents.client_paymentIntents)
        } catch (error) {
            console.log(error.message)
        }
        }
        getPaymentIntentsInfo()
    }, [searchParams])

    useEffect(() => {
  console.log(userPaymentIntents)
}, [userPaymentIntents])
    return (
        <div className='size-full'>
            <Navigation />
            <div className='relative w-full h-[90%] bg-white flex flex-col justify-center items-center gap-15'>
                <div className='w-full h-[8%] bg-slate-500 absolute top-0'></div>
                <div className='w-full h-[86%] bg-white flex text-[42px] font-bold flex flex-col justify-center items-center'>
                    <h1>Payment Successful</h1>
                    <Link to='/cart/checkout/confirmation/tracking' className='font-light text-[32px]'>Track Package</Link>
                </div>
                <Link to='/' className='text-[34px] font-medium'>Home</Link>
            </div>
        </div>
    )
}
