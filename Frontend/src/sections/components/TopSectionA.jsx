import { motion } from 'motion/react' 

export function TopSectionA() {
    return (
        <div className="relative w-full h-[14%] bg-gray-950 flex flex-col gap-3 flex items-start justify-center">
                <h4 className="relative left-[8%] text-slate-500/90 text-[18px] font-medium">New occasion!</h4>
                <h1 className="relative left-[8%] text-white text-[36px] font-bold">
                    Nature Dawn, Pre-registration
                </h1>
                <p className="relative left-[8%] text-white text-[18px] font-thin leading-[35px]">
                    We host our 4th annual festival this year from 16th feburary - 12th march. <br />
                    This year's activities will be held in the small town of [insert town name] in <br />
                    the swiss alps and we will offer discounts on nearby hotels.
                </p>
                <motion.div whileHover={{ opacity: 1 }} className="relative left-[8%] text-white text-[18px] font-medium leading-[35px] opacity-[.7]">Start booking here</motion.div>
                <div className="bg-[url('/marco-meyer-eAAjKAGEKmI-unsplash.jpg')] bg-center bg-cover w-[46%] h-[100%] absolute right-[0%]"></div>
                <div className="w-full absolute top-0 border-2 border-slate-400"></div>
                <div className="w-full absolute bottom-0 border-1 border-slate-200"></div>
            </div>
    )
}