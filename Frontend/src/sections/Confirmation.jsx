import { Navigation } from './components/Navigation'


export function StripePaymentConfirmation() {

    return (
        <div className='size-full'>
            <Navigation />
            <div className='relative w-full h-[90%] bg-white'>
                <div className='w-full h-[8%] bg-slate-500 absolute top-0'></div>
                <div className='w-full h-[86%] bg-white flex text-[42px] font-bold'>
                    Payment Successfull
                </div>
            </div>
        </div>
    )
}