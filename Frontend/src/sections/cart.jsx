import { Navigation } from './components/Navigation'
import { useState, useEffect } from 'react'

const mockitems = [
    {
        id: 1,
        name: 'Archon 1',
        description: 'Long distance, long lasting battery',
        imgurl: '/mitch-nielsen-pWtNPCpvVA8-unsplash.jpg',
        price: .5,
        mockprice: 235
    },
    {
        id: 1,
        name: 'Archon 1',
        description: 'Long distance, long lasting battery',
        imgurl: '/mitch-nielsen-pWtNPCpvVA8-unsplash.jpg',
        price: .5,
        mockprice: 235
    },
    {
        id: 1,
        name: 'Archon 1',
        description: 'Long distance, long lasting battery',
        imgurl: '/mitch-nielsen-pWtNPCpvVA8-unsplash.jpg',
        price: .5,
        mockprice: 235
    },
]

export function ShopCart() {
    const [ cart, setCart ] = useState(null)
    useEffect(() => {
        async function getUserCart() {
            try {
                const response = await fetch('/api/cart', {
                    method: 'GET'
                })
                const result = await response.json()
                console.log(result)
                console.log(response)
                if (!response.ok) {
                    setCart(null)
                    return
                }
                setCart(result)
                console.log(result)
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
                        <div className='h-[15%] w-[92%] bg-orange-400 relative rounded-[12px] top-[2%]'>

                        </div>
                        <div className='w-full h-[80%] bg-green-500 grid grid-rows-auto grid-cols-1 justify-items-center items-around grid-flow-row overflow-scroll gap-5 relative top-6 scrollbar-thin overflow-x-hidden'>
                            { cart ? 
                            cart.map((item) => {
                                return (
                                    <div className="text-[40px] text-blue-600 border w-[92%] h-[370px]">{item.id}</div>
                                )
                            })
                            :
                            <h1 className='text-[32px]'>{cart.message}</h1>
                            }
                        </div>
                    </div>
                    <div className="h-[100%] w-[35%] bg-sky-500 flex justify-center">
                        <div className='w-[85%] h-[75%] bg-purple-500 relative top-[5%]'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}