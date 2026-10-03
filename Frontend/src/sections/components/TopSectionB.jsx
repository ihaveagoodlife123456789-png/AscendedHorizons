export function TopSectionB() {
    return (
        <div className="z-2 relative top-[5%] w-[96%] h-[18%] bg-[url('/zetong-li-tShk_bW2PtU-unsplash.jpg')] bg-cover bg-center flex justify-start items-center rounded-[14px]">
            <div className="relative left-[6%] bottom-[6%] text-white flex flex-col items-center justify-center gap-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-[34px] font-bold">Hiking expedition</h1>
                    <div className="relative w-[72%] h-[2px] bg-white"></div>
                </div>
                <h2 className="text-[24px] font-light">Experience the great outdoors</h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Book Now
                </button>
            </div>
        </div>
    )
}