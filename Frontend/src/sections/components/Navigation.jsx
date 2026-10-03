import { motion } from 'motion/react'
import { useState } from 'react'

import { Link } from 'react-router-dom'

export function Navigation() {
  const [ cart, setCart ] = useState(null)
  const [ products, setProducts ] = useState(null)
  const variants = {
    onCart: { translateY: [0, -10, 0] },
    onProducts: { width: '160px', height: '220px', opacity: 1, translateX: -75}
  }

    return (
        <div className="text-white sticky top-0 z-10 w-full h-[10%] bg-black/90 flex items-center justify-center">
            <div className="absolute left-[2%] w-12 h-12 flex items-center gap-5">
              <img src="/icons8-wreath-64.png"></img>
              <div className="font-semibold">Ascended Horizons</div>
              <div className="relative left-8 size-fit flex items-center gap-2">
                <motion.div whileHover={{ color: '	hsl(226, 79%, 55%)' }} onMouseEnter={() => setProducts(true)} onMouseLeave={() => setProducts(false)}>Products</motion.div>
                <img src="\icons8-menu-50.png" className="w-[16px] h-[16px]" onMouseEnter={() => setProducts(true)} onMouseLeave={() => setProducts(false)} loading="lazy"/>
                <motion.div 
                variants={variants} 
                animate={ products ? 'onProducts' : null} 
                transition={{ duration: .2 }} 
                onMouseEnter={() => setProducts(true)} 
                onMouseLeave={() => setProducts(false)} 
                className="absolute top-[120%] left-[50%] w-0 h-0 bg-gray-900 border-black border-t-0 opacity-0 flex flex-col justify-center items-center text-white font-normal text-[16px] gap-2"
                >
                  <motion.h2 whileHover={{ fontWeight: 700}} transition={{ duration: .1}}>Drones</motion.h2>
                  <motion.h2 whileHover={{ fontWeight: 700}} transition={{ duration: .1}}>Cameras</motion.h2>
                  <motion.h2 whileHover={{ fontWeight: 700}} transition={{ duration: .1}}>Compasses</motion.h2>
                  <motion.h2 whileHover={{ fontWeight: 700}} transition={{ duration: .1}}>Watches</motion.h2>
                  <motion.h2 whileHover={{ fontWeight: 700}} transition={{ duration: .1}}>Backpacks</motion.h2>
                  <motion.h2 whileHover={{ fontWeight: 700}} transition={{ duration: .1}}>Gear</motion.h2>
                </motion.div>
              </div>
            </div>
                
                <div className="flex size-fit gap-12">
                  <motion.div whileHover={{ color: 'orange' }}>Foundation</motion.div>
                  <motion.div whileHover={{ color: 'orange' }}>Activities</motion.div>
                  <motion.div whileHover={{ color: 'orange' }}>Featured</motion.div>
                </div>

            <div className="absolute size-fit flex right-[5%] gap-6">
              <motion.img src="\icons8-settings-96.png" whileHover={{ rotate: -60 }} className="relative top-1 right-2 w-8 h-8"></motion.img>
              <div className="flex gap-2 items-center">
                <motion.div onMouseEnter={() => setCart(true)} onMouseLeave={() => setTimeout(() => setCart(false), 400 )} whileHover={{ color: 'hsl(305, 50%, 53%)' }} className='font-medium'>Cart</motion.div>
                <motion.img variants={variants} animate={ cart ? 'onCart' : null } transition={{ duration: .4 }} src="/icons8-cart-90.png" className="w-[30px] h-[30px]"></motion.img>
              </div>
              <motion.div whileHover={{ backgroundColor: '#abb1c0', color: '#030712'}} className="font-bold text-[22px] border-1 border-blue-300 rounded-[8px] py-[1px] px-2"><Link to="/register">Register</Link></motion.div>
            </div>
        </div>
    )
}