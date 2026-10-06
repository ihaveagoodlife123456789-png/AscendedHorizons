import { Navigation } from './components/Navigation'

export function StripePayment() {
    return (
        <div className='size-full'>
            <Navigation />
            <div className='realtive w-full h-[90%] bg-white'>
                <div className='w-full h-[8%] bg-slate-500 absolute top-0'></div>
                <div className='w-full h-[86%]'>

                </div>
                <div className='w-full h-[6%] bg-slate-700 absolute bottom-0'></div>
            </div>
        </div>
    )
}