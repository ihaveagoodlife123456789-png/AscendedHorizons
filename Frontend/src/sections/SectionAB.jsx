import { TopSectionA } from './components/TopSectionA'
import { BottomSectionA } from './components/BottomSectionA'
import { TopSectionB } from './components/TopSectionB'
import { BottomSectionB } from './components/BottomSectionB'

export function SectionAB() {
    return (
        <div className="relative w-full h-[3000px] bottom-[10%] bg-black flex flex-col items-center justify-start gap-0">
            <TopSectionA />
            <BottomSectionA />
            <TopSectionB />
            <BottomSectionB />
        </div>
    )
}