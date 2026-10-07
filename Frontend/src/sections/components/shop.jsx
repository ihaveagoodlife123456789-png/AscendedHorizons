import { Navigation } from './components/Navigation'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

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


export function DroneShop() {
    const [ items, setItems ] = useState(null)

    async function sonner(id) {

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
            throw new Error(response.message)
        }
        toast.success("Item added to cart", { style: { color: 'green', position: 'relative', left: '100px', width: '200px' }})
        } catch (error) {
            toast.error(`${error.message}`, { style: { color: 'red', position: 'relative', left: '100px', width: '200px' }})
        }
    }

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch('/api/items', {
                    method: 'GET'
                })
                const result = await response.json()
                if (!response.ok) {
                    setItems(null)
                    return;
                }
                setItems(result)
            } catch (err) {
                console.log('Server Error')
            }
        }
        getProducts()
    }, [])
    return (
        <div className="size-full overflow-hidden flex flex-col">
            <Navigation />
            <div className="h-[90%] w-full flex flex-col justify-start items-center">
                 <Toaster position="bottom-left" />
                <div className="h-[13%] w-full bg-slate-500 text-[38px] flex justify-center items-center gap-20">
                    <div className="flex gap-4 flex-wrap">
                    <h2 className="text-[22px] font-medium hover:font-bold hover:text-lime-600">Drones</h2>
                    <h2 className="text-[22px] font-medium hover:font-bold hover:text-lime-600">Cameras</h2>
                    <h2 className="text-[22px] font-medium hover:font-bold hover:text-lime-600">Compasses</h2>
                    </div>
                    <h1 className='relative bottom-[5%] font-medium'>Archon Series B</h1>
                    <div className="flex gap-4 flex-wrap">
                    <h2 className="text-[22px] font-medium hover:font-bold hover:text-lime-600">Watches</h2>
                    <h2 className="text-[22px] font-medium hover:font-bold hover:text-lime-600">Backpacks</h2>
                    <h2 className="text-[22px] font-medium hover:font-bold hover:text-lime-600">Gears</h2>
                    </div>
                </div>
                <div className="h-[87%] w-full flex">
                    <div className="w-[20%] h-[100%] bg-white flex justify-end items-center">
                        <div className="w-[95%] h-[70%] flex flex-col justify-center items-center relative bottom-[10%] bg-slate-100 gap-2">
                            <h1 className="text-[32px] font-medium">All series</h1>
                            <h3 className="text-[18px] font-medium hover:text-yellow-500">Archon Series A</h3>
                            <h3 className="text-green-700 text-[18px] font-medium hover:text-yellow-500">Archon Series B</h3>
                            <h3 className="text-[18px] font-medium hover:text-yellow-500">Arch Series</h3>
                            <h3 className="text-[18px] font-medium hover:text-yellow-500">Series SE</h3>
                            <h3 className="text-[18px] font-medium hover:text-yellow-500">Xelton X</h3>
                        </div>
                    </div>
                        <div className="relative w-[80%] bg-white grid grid-rows-auto grid-cols-1 justify-items-center items-between grid-flow-row overflow-scroll gap-2 relative top-6 scrollbar-thin">
                            {
                                items ? 
                                items.map((e) => {
                                    return (
                                        <motion.div key={e.id} className="w-[90%] h-[450px] overflow-hidden">
                                            <motion.div whileHover={{ scale: 1.05 }} className="size-full bg-center bg-cover flex justify-end items-center" style={{ backgroundImage: `url(${e.imgurl})`}}>
                                            <div className="h-[90%] w-[35%] bg-slate-900/70 rounded-[12px] relative right-[8%] flex flex-col justify-center items-center gap-8">
                                            <h2 className="text-white text-[18px] font-bold">{e.name}</h2>
                                            <p className="text-white text-[20px] font-thin text-center">{e.description}</p>
                                            <h3 className='text-white text-[20px] font-medium'>{e.mockprice}$</h3>
                                            <h4 className="text-white text-[24px] font-thin">o o o o o</h4>
                                            <motion.button className="relative z-10 text-white flex gap-1 text-[18px] font-thin border-slate-200 border-2 rounded-[10px] px-1 py-1 hover:bg-slate-800" onClick={() => sonner(e.id)}>Add<img src="/icons8-add-50.png" className="relative z-10 h-[25px]" /></motion.button>
                                            </div>
                                            </motion.div>
                                            <div>{e.message ? e.message : null}</div>
                                        </motion.div>
                                    )
                                })
                                :
                                <h1>No results found</h1>
                            }    
                    </div>
                </div>
            </div>
        </div>
    )
}