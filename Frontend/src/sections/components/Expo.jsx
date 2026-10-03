import { motion } from 'motion/react'
import { use, useState } from 'react'

export function Exposition() {
    const [ droneExpo, setDronExpo ] = useState(null)
    const variants = {
        on: { opacity: 1 },
        off: { opacity: 0 }
    }
    return (
        <div className="w-[20%] h-[40%] absolute right-[25%] top-[10%]">
            <motion.div 
            initial={{ rotate: 0, translateX: 0, scale: 1, zIndex: 1 }} animate={{ rotate: -10, translateX: -160 }} whileHover={{ zIndex: 3, translateY: -40, scale: 1.1 }} 
            className="absolute size-full bg-[url('/alessio-soggetti-rSFxBGpnluw-unsplash.jpg')] bg-no-repeat bg-cover bg-center"
            >
                <div className='absolute bottom-[10%] left-[31%] text-green-900 font-bold text-[24px]'>Series XE</div>
            </motion.div>
            <motion.div initial={{ scale: 1, zIndex: 2 }} animate={{}} whileHover={{ zIndex: 3, translateY: -40, scale: 1.1 }}
            className="absolute size-full bg-[url('/iewek-gnos-ZlkRrzJl20Q-unsplash.jpg')] bg-no-repeat bg-cover bg-center"
            >
                <div className='absolute bottom-[10%] left-[21%] text-orange-700 font-bold text-[24px]'>Archan Series B</div>
            </motion.div>
            <motion.div initial={{ rotate: 0, translateX: 0, scale: 1, zIndex: 1 }} animate={{ rotate: 10, translateX: 160 }} whileHover={{ zIndex: 2, translateY: -40, scale: 1.1 }} 
            className="absolute size-full bg-[url('/joao-rocha-O0xam7DNJy4-unsplash.jpg')] bg-no-repeat bg-cover bg-center"
            >
                <div className='absolute bottom-[10%] left-[28%] text-red-600 font-bold text-[24px]'>Arch Series</div>
            </motion.div>
        </div>
    )
}