import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Exposition } from './Expo.jsx';

export function Top() {
    return (
        <div className="relative left-[8%] top-[4%] text-white w-full h-[90%] flex flex-col items-start gap-10">
          <h1 className="text-[62px] font-extrabold leading-[85px]">
          Where every <br />
          <span className="text-green-800/80">Journey</span> <br />
          Begins
          </h1>
          <p className="font-light leading-[40px] text-[20px]">
            Amidst a moutain far far away <br />
            A concealed euphoric realm <br />
            Arriving there by only <br />
            Asserting the beholded's presence of the blue screechers
          </p>
          <motion.button 
          initial={{ scale: 1, color: 'white', backgroundColor: '#1d4ed8', borderColor: '#2563eb' }} whileHover={{ scale: 1.08, color: '#1d4ed8', backgroundColor: 'white', borderColor: 'none' }}
          className="border-2 font-bold bg-blue-700 border-blue-600 rounded-[8px] py-1 px-1 text-[22px] font-sans"
          >
            Shop Now
          </motion.button>
          <motion.div
          initial={{ color: '#51a2ff '}} whileHover={{ color: 'white', duration: 2 }}
          className="text-blue-400"
          >
            <Link to="/register">
            New here? Register
            </Link>
          </motion.div>

          <Exposition />

        </div>
    )
}