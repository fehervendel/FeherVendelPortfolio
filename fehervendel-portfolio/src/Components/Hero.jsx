import './Hero.css';
import AnimationWrapper from "./AnimationWrapper.jsx";
import { useContext } from "react";
import { ContentContext } from "./ContentContext.jsx";

export default function Hero() {
    const {content}  = useContext(ContentContext);
    let heroContent = content.filter(item => item.sectionId === "hero").sort((a, b) => a.order - b.order);


    return (
        <section id='hero' className="flex justify-center bg-transparent">
            <div className="container flex flex-col-reverse lg:flex-row px-8">


                <div className="lg:w-1/2 lg:mt-44 md:pb-20 md:mt-60 sm:mt-40 mt-28
                 pt-36 lg:pt-96">
                    <AnimationWrapper delay='0.9s'>
                        <h1 className="text-stone-50 uppercase font-bold text-center md:text-start pb-52 sm:pb-8  !text-5 md:!text-7xl lg:!text-8xl text-stroke md:whitespace-nowrap">{heroContent[1].textContent} <br></br> {heroContent[2].textContent} <br></br> <span className="whitespace-nowrap">&#123; <span className="colorful">{heroContent[3].textContent}</span> &#125;</span> {heroContent[4].textContent}</h1>
                    </AnimationWrapper>
                </div>


                    <div className="lg:w-1/2 flex justify-center md:justify-end text-stroke pt-30">
                        <AnimationWrapper delay='0.7s'>
                            <h1 className="text-stone-50 uppercase text-center font-bold !text-6 md:!text-8xl lg:!text-9xl lg:text-end">{heroContent[0].textContent}</h1>
                        </AnimationWrapper>
                    </div>


            </div>
        </section>
    )
}