import laptop from "../../public/laptop.jpg";
import { useContext } from "react";
import AnimationWrapper from "./AnimationWrapper.jsx";
import {ContentContext} from "./ContentContext.jsx";

export default function ParallaxSection() {
    const {content}  = useContext(ContentContext);
    let parallaxContent = content.filter(item => item.sectionId === "parallax").sort((a, b) => a.order - b.order);



    return (
        <div id="parallax" className="!text-stone-50 w-full md:mb-16">
            <div className="flex flex-col md:flex-row w-full">
                <div className="flex-1/2 w-full bg-cover bg-center md:bg-fixed min-h-80 order-2 md:order-1" style={{backgroundImage: `url(${laptop})`}}>
                </div>

                <div className="flex-1/2  w-full flex justify-start items-center px-2 md:px-4 lg:px-16 lg:pt-16 lg:pb-16 py-8 order-1 md:order-2">
                    <AnimationWrapper delay="0.2s"><p className="whitespace-pre-wrap !text-xl">{parallaxContent[0].textContent}</p></AnimationWrapper>
                </div>
            </div>

            <div className="md:flex w-full">
                <div className="flex-1/2 w-full flex justify-end items-center px-2 md:px-4 lg:px-16 lg:pt-16 lg:pb-16 py-8">
                    <AnimationWrapper delay="0.2s"><p className="whitespace-pre-wrap md:text-end !text-xl">{parallaxContent[1].textContent}</p></AnimationWrapper>
                </div>

                <div className="flex-1/2 w-full bg-cover bg-center md:bg-fixed hidden md:block" style={{backgroundImage: `url(${laptop})`}}>
                </div>
            </div>
        </div>
    )
}