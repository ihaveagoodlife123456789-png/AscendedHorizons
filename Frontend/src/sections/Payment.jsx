import { Navigation } from './components/Navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

export function StripePayment() {
    return (
        <div className='size-full'>
            <Navigation />
            <div className='relative w-full h-[90%] bg-white'>
                <div className='w-full h-[8%] bg-slate-500 absolute top-0'></div>
                <div className='w-full h-[86%]'>
                    {/*<Elements></Elements>*/}
                </div>
                <div className='w-full h-[6%] bg-slate-700 absolute bottom-0'></div>
            </div>
        </div>
    )
}