import { Navigation } from './components/Navigation'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function StripePaymentConfirmation() {
    const [searchParams] = useSearchParams()
    const [ userPaymentIntents, setUserPaymentIntents] = useState(null)
    const [ userCart, setUserCart ] = useState(null)
    const [ shipping, setShipping ] = useState(null)
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
            const responseGetCartInfo = await fetch('/api/cart', {
                method: 'GET'
            })
            const responseCreateTransaction = await fetch('/api/shipment/transaction', {
                method: 'POST'
            })
            const responseGetTransaction = await fetch('/api/shipment/transaction', {
                method: 'GET'
            })
            console.log(responseGetTransaction.json())
            const resultGetTransaction = await responseGetTransaction.json()
            const resultGetCartInfo = await responseGetCartInfo.json()
            setShipping(resultGetTransaction)
            setUserCart(resultGetCartInfo)
            console.log(resultGetCartInfo)
            const responseDeleteCart = await fetch('/api/cart/deleteAll', {
                method: 'DELETE'
                })
            const resultPaymentIntents = await responsePaymentIntents.json()
            const resultDeleteCart = await responseDeleteCart.json()
            if(!responsePaymentIntents.ok || !responseDeleteCart.ok) {
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
                        <div className='relative w-[46%] h-[92%] flex flex-col justify-center items-center bg-slate-100'>
                            <h1 className='h-[15%]'>Order</h1>
                            <div className='w-[92%] h-[60%] grid grid-rows-auto grid-cols-1 justify-items-center items-around grid-flow-row overflow-scroll gap-5 relative top-6 scrollbar-thin overflow-x-hidden'>
                                {
                                    userCart ?
                                    userCart.map((item) => {
                                        return (
                                            <div key={item.id} className='relative w-full h-[250px] bg-cover bg-center' style={{ backgroundImage: `url(${item.imgurl})`}}>
                                                <h1 className='font-bold txet-blue-800'>{item.name}</h1>
                                                <h2 className='absolute right-5 bottom-5 font-extrabold text-green-800'>{item.price}$</h2>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                                }
                            </div>
                    <Link to='/' className='text-[26px] font-medium absolute left-1 bottom-1'>Home</Link>
                    <h2 className='text-[34px] font-thin h-[15%]'>Total</h2>
                        </div>
                        <div className='w-[46%] h-[92%] flex flex-col justify-center items-center bg-slate-100'>
                            <h1 className='h-[15%]'>Package delivrery</h1>
                            <div className='w-[92%] h-[50%]'>
                                {
                                    shipping ?
                                    <div>hi</div>
                                    :
                                    null
                                }
                            </div>
                            <div className='font-light text-[32px] h-[15%]'>Track Package:<div></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
