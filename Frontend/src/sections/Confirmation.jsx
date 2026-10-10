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
            const responsePaymentIntents = await fetch('/api/cart/checkout/retrieve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentIntentId: getUserPaymentIntentsId })
            })
            const responseDeleteCart = await fetch('/api/cart/deleteAll', {
                method: 'DELETE'
                })
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
            <div className='relative w-full h-[90%] bg-white flex flex-col justify-start'>
                <div className='w-full h-[8%] bg-slate-500 flex justify-start'><h1 className='text-[42px] font-bold relative left-5'>Order details</h1></div>
                <div className='w-full h-[86%] bg-white flex text-[42px] font-bold flex flex-col justify-center items-center gap-2'>
                    <div className='w-[75%] h-[12%] bg-slate-200 flex justify-center items-center'><h1>Payment Successful</h1></div>
                    <div className='w-[90%] h-[80%] bg-slate-200 flex justify-center items-center gap-3 rounded-[8px]'>
                        <div className='w-[46%] h-[92%] flex flex-col justify-center items-center bg-slate-100'>
                            <h1 className='h-[15%]'>Order</h1>
                            <div className='w-[92%] h-[60%]'>

                            </div>
                    <Link to='/' className='text-[34px] font-medium h-[15%]'>Home</Link>
                        </div>
                        <div className='w-[46%] h-[92%] flex flex-col justify-center items-center bg-slate-100'>
                            <h1 className='h-[15%]'>Package delivrery</h1>
                            <div className='w-[92%] h-[50%]'>

                            </div>
                            <Link to='/cart/checkout/confirmation/tracking' className='font-light text-[32px] h-[15%]'>Track Package</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
