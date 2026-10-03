export function TopSectionC() {
    return (
        <div className="w-full h-[30%] flex justify-center items-center gap-14">
                <div className="w-[30%] h-[78%] flex justify-center items-center">
                    <img src="/adam-kool-ndN00KmbJ1c-unsplash.jpg" className="size-[95%] rounded-lg" loading="lazy"></img>
                </div>
                <div className="w-[28%] h-[78%] text-white flex flex-col justify-center items-center gap-10">
                    <h1 className="text-[38px] font-bold">New Park</h1>
                    <p className="text-[22px] font-thin">Aberetus is a protected area that one of the oldest ecosystems in the world. We opened it to the public today for the first time since 1878.</p>
                    <button className="bg-green-500 py-2 px-4 rounded">Learn More</button>
                </div>
            </div>
    )
}