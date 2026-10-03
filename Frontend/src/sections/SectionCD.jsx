import { TopSectionC } from "./components/TopSectionC";
import { BottomSectionC } from "./components/BottomSectionC";
import { WholeSectionD } from "./components/WholeSectionD";

export function SectionCD() {
    return (
        <div className="w-full h-[1600px] bg-black relative bottom-[94px] flex flex-col justify-start gap-0">
            <TopSectionC />
            <BottomSectionC />
            <WholeSectionD />
        </div>
    )
}