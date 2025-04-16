import portfolioLogoCropped from "../assets/portfolioLogoCropped.png"
import HeroButton from "./HeroButton.jsx";
import { ContentContext } from "./ContentContext.jsx";
import {useContext} from "react";
import AnimationWrapper from "./AnimationWrapper.jsx";

export default function Footer() {
    const {content}  = useContext(ContentContext);
    let footerContent = content.filter(item => item.sectionId === "footer").sort((a, b) => a.order - b.order);


    function handleScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    return (
        <>
            <div id="footer" className="border-t border-b border-stone-50 w-full md:flex py-8 justify-between border-b-amber-50/30">
                <AnimationWrapper delay="0.2s"><a className="cursor-pointer pointer-events-auto flex justify-center items-center" onClick={handleScrollTop}>
                    <img src={portfolioLogoCropped} alt="logo" className="w-[125px] object-contain"/>
                </a></AnimationWrapper>
                <AnimationWrapper delay="0.2s"><p className="!text-xl !text-stone-50 md:px-16 text-center flex items-center py-8 md:py-0">{footerContent[0].textContent}</p></AnimationWrapper>
                <ol className='text-end flex flex-col sm:flex-row md:flex-col gap-2 items-center justify-center'>
                    <AnimationWrapper delay="0.2s"><HeroButton link='#aboutMe'>About me</HeroButton></AnimationWrapper>
                    <AnimationWrapper delay="0.2s"><HeroButton link='#parallax'>My Journey</HeroButton></AnimationWrapper>
                    <AnimationWrapper delay="0.2s"><HeroButton link='#githubProjects'>Projects</HeroButton></AnimationWrapper>
                    <AnimationWrapper delay="0.2s"><HeroButton target="_blank" link='https://github.com/fehervendel/'>GitHub</HeroButton></AnimationWrapper>
                </ol>
            </div>
            <AnimationWrapper delay="0.2s"><div className="text-stone-50 text-center py-8">
                2025 © all rights reserved | Created by: Vendel Fehér
            </div></AnimationWrapper>
        </>
    )
}