import { Toaster, toast } from 'sonner'
import { Navigation } from './components/Navigation'
import { useState, useEffect } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

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
    const [ totalItemCount, setTotalItemCount ] = useState(null)

    const getUserCart = useCallback(async () => {
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
                const totalItems = result.reduce((acc, currentItem) => {
                    const existingItem = acc.find(item => item.id === currentItem.id)
                    if (existingItem) {
                    existingItem.quantity += 1
                    } else {
                    acc.push({ ...currentItem, quantity: 1 })
                }
                 return acc
                }, [])
                const totalItemsCount =  totalItems.reduce((x, y) => {
                    return x + y.quantity
                }, 0)

                setTotalItemCount(totalItemsCount)
                setTotalItem(totalItems)
                setTotalPrice(total)
                console.log(totalItems)
                console.log(result)
            } catch (error) {
                setCart(null)
            }
    }, [])

    useEffect(() => {
        getUserCart()
    }, [getUserCart])
    async function addItem(id) {
        try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        const result = await response.json()
        if (!response.ok) {
            throw new Error(result.message)
        }
        console.log(result)
        toast.success(result.message, { style: { color: 'green', position: 'relative', left: '100px', width: '200px' }})
        getUserCart()
        } catch (error) {
            console.log('Server Error')
            toast.error(error.message, { style: { color: 'red', position: 'relative', left: '100px', width: '200px' }})
        }
    }
    async function removeItem(id) {
        try {
        const response = await fetch('/api/cart/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        const result = await response.json()
        if (!response.ok) {
            throw new Error(response.message)
        }
        console.log(result)
        toast.success(result.message, { style: { color: 'green', position: 'relative', left: '100px', width: '200px' }})
        getUserCart()
        } catch (error) {
            console.log('Server Error')
            toast.error(error.message, { style: { color: 'red', position: 'relative', left: '100px', width: '200px' }})
        }
    }
    return (
        <div className="size-full">
            <Navigation />
            <div className='h-[90%] w-full'>
                <Toaster position='top-right'/>
                <div className="h-[8%] w-full bg-slate-400 flex justify-between items-center">
                    <h1 className='text-[46px] font-bold relative left-[5%]'>Shopping cart</h1>
                    <div className='flex gap-1 justify-center items-center font-medium relative left-[10%]'><img src="/icons8-canada-48.png" className='hover:size-[50px]'/><h2 className='hover:font-bold'>English</h2><div className='font-bold'>|</div><h2 className='hover:font-bold'>CAD</h2></div>
                    <div className='text-red-700 text-[16px] flex font-medium decoration-2 hover:underline relative right-[5%]'><img src="/icons8-garbage-48.png" className='size-[25px]'/><h3>Remove all</h3></div>
                </div>
                <div className="h-[92%] w-full bg-white flex">
                    <div className="h-[100%] w-[65%] bg-white flex flex-col items-center">
                        <div className='h-[15%] w-[92%] bg-slate-300 relative rounded-[12px] top-[2%] flex justify-start items-center gap-25'>
                            <h1 className='text-[34px] font-medium relative left-[5%]'>Order</h1>
                            <h1 className='text-[26px] font-thin'>Get free delivery on 250$ purchases or more!</h1>
                        </div>
                        <div className='w-full h-[80%] bg-white grid grid-rows-auto grid-cols-1 justify-items-center items-around grid-flow-row overflow-scroll gap-5 relative top-6 scrollbar-thin overflow-x-hidden'>
                            { totalItem ? 
                            totalItem.map((item) => {
                                return (
                                    <div className="text-[40px] bg-slate-300 text-blue-700 border-green-800 border-2 w-[92%] h-[370px] flex">
                                        <div className='w-[35%] h-full flex justify-center items-center'>
                                            <div className="w-[90%] h-[70%] bg-center bg-cover rounded-[6px]" style={{ backgroundImage: `url(${item.imgurl})`}}></div>
                                        </div>
                                        <div className='w-[45%] h-full flex flex-col justify-center items-center gap-6'>
                                            <h2 className="text-[38px] font-medium">{item.name}</h2>
                                            <p className="text-[24px] font-thin text-center text-black">{item.description}</p>
                                            <div className="text-[18px] font-bold flex gap-2 text-black"><button className='border-slate-200 border-2 rounded-[20px] text-[28px] px-4 hover:bg-white' onClick={() => removeItem(item.id)}>-</button><h3 className="text-[24px]">{item.quantity}</h3><button className='border-slate-200 border-2 rounded-[20px] text-[28px] px-4 hover:bg-white' onClick={() => addItem(item.id)}>+</button></div>
                                        </div>
                                        <div className='w-[20%] h-full text-[28px] font-light relative top-[5%] text-black'>{item.price}$/item</div>
                                    </div>
                                )
                            })
                            :
                            <h1 className='text-[32px]'>{'Please login first'}</h1>
                            }
                        </div>
                    </div>
                    <div className="h-[100%] w-[35%] bg-white flex justify-center">
                        <div className='w-[85%] h-[75%] bg-slate-200 relative top-[5%] rounded-[2px] flex flex-col justify-end items-center gap-5'>
                            <div className='flex flex-col gap-2 justify-center items-center'>
                                <h2 className='text-[14px] font-extrabold text-slate-900/70'>Supported payment methods</h2>
                                <div className='flex gap-2'>
                                    <img src="/ma_symbol_opt_45_1x.png" className='w-[60px] h-[40px]'></img>
                                    <img src="/icons8-apple-pay-30.png" className='size-[40px]'></img>
                                    <img src="/icons8-paypal-48.png" className='size-[40px]'></img>
                                    <img src="/049392458499ef321c2c4edd3104b601.png" className='size-[40px]'></img>
                                    <img src="/Google_Pay_Logo.svg" className='size-[40px]'></img>
                                </div>
                            </div>
                            <p className='w-[90%] text-[16px] font-medium text-center'>Purchasing subscripton+ let's you have up to a 7% discount on selected items and faster deliveries</p>
                            <div className='flex gap-10 justify-center items-center'>
                                <h2 className='font-medium text-[18px]'>Item(s) total{`(${totalItemCount})`}</h2>
                                <h2>${totalPrice}</h2>
                            </div>
                            <div className="bg-slate-500 w-[88%] h-[2px]"></div>
                            <div className="flex gap-10 font-[26px] justify-center items-center">
                                <h2 className='font-medium text-[18px]'>Subtotal</h2>
                                <h2>{totalPrice ? ` $${totalPrice}` : 'No items yet'}</h2>
                            </div>
                            <div className="flex gap-10 font-[26px] justify-center items-center">
                                <h2 className='font-medium text-[18px]'>Shipping</h2>
                                <h2>Enter adress</h2>
                            </div>
                            <div className="flex gap-10 font-[26px] justify-center items-center">
                                <h2 className='font-medium text-[18px]'>Tax</h2>
                                <h2>No tax</h2>
                            </div>
                            <div className="bg-slate-500 w-[88%] h-[2px]"></div>
                            <div className="text-[26px] font-medium flex gap-10">
                                <h2>Total</h2>
                                <h2>{totalPrice ? ` $${totalPrice}` : 'No items yet'}</h2>
                            </div>
                            <button className="bg-green-500 border-green-700 border-2 rounded-[6px] text-[24px] font-bold px-3 hover:bg-white"><Link to="/cart/checkout">Checkout</Link></button>
                            <div><img src="/icons8-leaf-50.png" className='size-[25px]'/><div className='font-light text-[18px]'>2% of sales will be donated to the <span className='font-normal text-green-700'>environment</span></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}