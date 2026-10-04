import { Navigation } from './components/Navigation'

export function DroneShop() {
    return (
        <div className="size-full">
            <Navigation />
            <div className="h-[90%] w-full flex justify-center items-center">
                <h1 className="text-[42px] font-medium text-black">Buy drones here!</h1>
            </div>
        </div>
    )
}