import portfolioLogoCropped from "../assets/portfolioLogoCropped.png"
import HeroButton from "./HeroButton.jsx";
import { ContentContext } from "./ContentContext.jsx";
import {useContext} from "react";

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
                <a className="cursor-pointer pointer-events-auto flex justify-center md:block" onClick={handleScrollTop}>
                    <img src={portfolioLogoCropped} alt="logo" className="w-[125px]"/>
                </a>
                <p className="!text-xl !text-stone-50 md:px-16 text-center flex items-center py-8 md:py-0">{footerContent[0].textContent}</p>
                <ol className='text-end flex md:flex-col gap-2 justify-center'>
                    <HeroButton link='#aboutMe'>About me</HeroButton>
                    <HeroButton link='#githubProjects'>Projects</HeroButton>
                    <HeroButton target="_blank" link='https://github.com/fehervendel/'>GitHub</HeroButton>
                </ol>
            </div>
            <div className="text-stone-50 text-center py-4">
                2025 © all rights reserved | Created by: Vendel Fehér
            </div>
        </>
    )
}