export function BottomSectionA() {
    return (
            <div className="w-full h-[28%] flex flex-col items-center justify-start">
                <div className='relative top-[6%] h-[40%] w-full flex bg-slate-950/70 flex-col items-center justify-center gap-6'>
                    <div className='text-white text-[42px] tracking-[1px] flex flex-col items-center justify-center gap-1 font-semibold'><h1>This month's</h1><h1>featured Specials</h1></div>
                    <div className='text-white text-[20px] font-thin opacity-[1] flex flex-col items-center justify-center gap-3'><h3>Our newest addition in the 2026 lineup</h3><h3><span className='font-medium text-[24px]'>Archon</span> Series B</h3></div>
                </div>
                <div className="relative top-[10%] w-full h-[86%] flex items-center justify-center gap-2">
                    <div className="relative w-[33%] h-[92%] bg-[url('/yuhan-chang-Dw4CrTVc6ic-unsplash.jpg'))] bg-cover bg-center flex items-start justify-center">
                    <div className="size-fit relative top-[5%] flex flex-col items-center">
                        <h3 className="text-slate-900/90 text-[18px] font-medium">Archon Series B</h3>
                        <h1 className='text-slate-950 text-[26px] font-bold'>Archon S3</h1>
                        <p className='text-slate-200 text-[24px] font-light'>Short distance, Extremly fast speed</p>
                    </div>
                    <img src="/icons8-menu-100.png" className="absolute bottom-4 right-4 size-8"></img>
                    </div>
                    <div className="relative w-[33%] h-[92%] bg-[url('/mitch-nielsen-pWtNPCpvVA8-unsplash.jpg'))] bg-cover bg-center flex items-start justify-center">
                    <div className="size-fit relative top-[5%] flex flex-col items-center">
                        <h3 className="text-slate-900/90 text-[18px] font-medium">Archon Series B</h3>
                        <h1 className='text-slate-950 text-[26px] font-bold'>Archon S1</h1>
                    </div>
                    <img src="/icons8-menu-100.png" className="absolute bottom-4 right-4 size-8"></img>
                    </div>
                    <div className="relative w-[33%] h-[92%] bg-[url('/yitzhak-rodriguez-mVI7sD0nTlA-unsplash.jpg'))] bg-cover bg-center flex items-start justify-center">
                    <div className="size-fit relative top-[5%] flex flex-col items-center">
                        <h3 className="text-slate-900/90 text-[18px] font-medium">Archon Series B</h3>
                        <h1 className='text-slate-950 text-[26px] font-bold'>Archon S2</h1>
                        <p className='text-slate-200 text-[24px] font-light'>Ergonomic, safe and comfortable</p>
                    </div>
                     <img src="/icons8-menu-100.png" className="absolute bottom-4 right-4 size-8"></img>
                    </div>
                </div>
            </div>
    )
} 