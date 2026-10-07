import { Navigation } from './components/Navigation'
import { Link } from 'react-router-dom'


export function StripePaymentConfirmation() {

    return (
        <div className='size-full'>
            <Navigation />
            <div className='relative w-full h-[90%] bg-white flex flex-col gap-15'>
                <div className='w-full h-[8%] bg-slate-500 absolute top-0'></div>
                <div className='w-full h-[86%] bg-white flex text-[42px] font-bold flex justify-center items-center'>
                    Payment Successfull
                </div>
                <Link to='/' className='text-[34px] font-medium'>Home</Link>
            </div>
        </div>
    )
}