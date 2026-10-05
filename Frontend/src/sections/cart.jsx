import { Navigation } from './components/Navigation'
import { useState, useEffect } from 'react'

export function ShopCart() {
    const [ cart, setCart ] = useState(null)
    useEffect(() => {
        async function getUserCart() {
            try {
                const response = await fetch('/api/cart', {
                    method: 'GET'
                })
                const result = await response.json()
                if (!response.ok) {
                    setCart(null)
                    return
                }
                setCart({ message: result.message })
                console.log(result.message)
            } catch (error) {
                setCart(null)
            }
        }
        getUserCart()
    }, [])
    return (
        <div className="size-full">
            <Navigation />
            <div className='h-[90%] w-full'>
                <div className="h-[13%] w-full bg-slate-400">

                </div>
                <div className="h-[87%] w-full bg-white flex">
                    <div className="h-[100%] w-[65%] bg-red-400 flex flex-col items-center">
                        <div className='h-[15%] w-[92%] bg-orange-400 relative top-[3%] rounded-[12px]'>

                        </div>
                        <div className='w-full h-[85%] bg-green-500 flex justify-center items-center'>
                            { cart ? 
                            <div className='text-[32px]'>{cart.message[0]}</div>
                            :
                            <h1 className='text-[32px]'>Something went wrong</h1>
                            }
                        </div>
                    </div>
                    <div className="h-full w-[35%] bg-sky-500 flex justify-center">
                        <div className='w-[85%] h-[75%] bg-purple-500 relative top-[5%]'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}