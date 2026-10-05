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
    const [ totalPrice, setTotalPrice ] = useState(null)
    const [ totalItem, setTotalItem ] = useState(null)
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
                setCart(result)
                const total = result.reduce((x, y) => {
                    return x + y.price
                }, 0)
                const totalItems = result.reduce((x, y) => {
                    const id = y.id
                    x[id] = (x[id] || 0) + 1 
                    return x
                }, [])
                console.log(totalItems)
                setTotalItem(totalItems)
                setTotalPrice(total)
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
                <div className="h-[8%] w-full bg-slate-400 flex justify-start">
                    <h1 className='text-[42px] font-medium relative left-[5%]'>Shopping cart</h1>
                </div>
                <div className="h-[92%] w-full bg-white flex">
                    <div className="h-[100%] w-[65%] bg-white flex flex-col items-center">
                        <div className='h-[15%] w-[92%] bg-slate-300 relative rounded-[12px] top-[2%] flex justify-start items-center gap-25'>
                            <h1 className='text-[36px] font-bold relative left-[5%]'>Order</h1>
                            <h1 className='text-[26px] font-thin'>Get free delivery on 250$ purchases or more!</h1>
                        </div>
                        <div className='w-full h-[80%] bg-white grid grid-rows-auto grid-cols-1 justify-items-center items-around grid-flow-row overflow-scroll gap-5 relative top-6 scrollbar-thin overflow-x-hidden'>
                            { cart ? 
                            cart.map((item) => {
                                return (
                                    <div className="text-[40px] bg-slate-300 text-blue-600 border-blue-700 border-2 w-[92%] h-[370px] flex">
                                        <div className='w-[35%] h-full flex justify-center items-center'>
                                            <div className="w-[90%] h-[70%] bg-center bg-cover rounded-[6px]" style={{ backgroundImage: `url(${item.imgurl})`}}></div>
                                        </div>
                                        <div className='w-[45%] h-full flex flex-col justify-center items-center gap-6'>
                                            <h2 className="text-[38px] font-medium">{item.name}</h2>
                                            <p className="text-[24px] font-thin text-center">{item.description}</p>
                                            <div className="text-[18px] font-bold"><button className='border-slate-200 border-2 rounded-[20px] text-[28px] px-4'>-</button>1<button className='border-slate-200 border-2 rounded-[20px] text-[28px] px-4'>+</button></div>
                                        </div>
                                        <div className='w-[20%] h-full text-[28px] font-medium relative top-[5%]'>{item.price}$/item</div>
                                    </div>
                                )
                            })
                            :
                            <h1 className='text-[32px]'>{'Please login first'}</h1>
                            }
                        </div>
                    </div>
                    <div className="h-[100%] w-[35%] bg-white flex justify-center">
                        <div className='w-[85%] h-[75%] bg-slate-200 relative top-[5%] rounded-[2px] flex flex-col justify-center items-center'>
                            <div className="text-[32px] font-medium">{
                                totalPrice ? `Subtotal: ${totalPrice}` : 'No items yet'
                                }</div>
                            <button className="bg-green-500 border-green-700 border-2 rounded-[6px] text-[24px] px-3">Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}