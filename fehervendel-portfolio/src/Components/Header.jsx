import { useEffect, useState } from "react";
import portfolioLogoCropped from "../assets/portfolioLogoCropped.png";
import HeroButton from '../components/HeroButton.jsx';
import { Menu, X } from 'lucide-react';
import { createPortal } from "react-dom";
import AnimationWrapper from "./AnimationWrapper.jsx";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showHeader, setShowHeader] = useState(true);

    function handleMenuClick() {
        setIsMenuOpen(prevState => !prevState);
        document.body.classList.toggle('overflow-hidden', !isMenuOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setScrolled(currentScrollY > 50);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    let cssClasses = `flex justify-center left-0 fixed w-screen py-4 transition-all duration-300 max-w-full z-50 ${
        scrolled ? "bg-black/30 shadow-md backdrop-blur-lg" : "bg-transparent"
    } ${showHeader ? "top-0" : "-top-32"}`;

    if (scrolled) {
        cssClasses += " bg-black/30 shadow-md backdrop-blur-lg";
    } else {
        cssClasses += ' bg-transparent';
    }

    function handleScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <>
            <nav id='header' className={cssClasses}>
                <div className="container px-8 flex items-center justify-between py-2">
                    <div className="lg:w-1/4">
                        <a className="cursor-pointer pointer-events-auto" onClick={handleScrollTop}>
                            <img src={portfolioLogoCropped} alt="logo" className="w-[55px]" />
                        </a>
                    </div>
                    {isMobile ? (
                        isMenuOpen ? null :
                            <button onClick={handleMenuClick} className='text-black pointer-events-auto'>
                                <Menu size={25} />
                            </button>
                        ) : (
                            <>
                                <div className="lg:w-1/2 px-4">
                                    <ol className='flex justify-between items-center'>
                                        <HeroButton link='#aboutMe'>About me</HeroButton>
                                        <HeroButton link='#parallax'>My journey</HeroButton>
                                        <HeroButton link='#githubProjects'>Projects</HeroButton>
                                        <HeroButton target="_blank" link='https://github.com/fehervendel/'>GitHub</HeroButton>
                                    </ol>
                                </div>
                                <div className="lg:w-1/4">
                                    <ul className='flex justify-end items-center'>
                                        <HeroButton link='#form'>Contact</HeroButton>
                                    </ul>
                                </div>
                            </>
                        )}
                </div>
            </nav>

            {isMenuOpen && createPortal(
                <ul className="fixed top-0 left-0 w-full h-full bg-black/80 flex flex-col items-center justify-center gap-6 text-white z-50 transition-opacity hamburger-buttons">
                    <HeroButton link='#aboutMe' handleMenuClick={handleMenuClick}><AnimationWrapper >About me</AnimationWrapper></HeroButton>
                    <HeroButton link='#parallax' handleMenuClick={handleMenuClick}><AnimationWrapper >My journey</AnimationWrapper></HeroButton>
                    <HeroButton link='#githubProjects' handleMenuClick={handleMenuClick}><AnimationWrapper delay="0.1s">Projects</AnimationWrapper></HeroButton>
                    <HeroButton target="_blank" link='https://github.com/fehervendel/' handleMenuClick={handleMenuClick}><AnimationWrapper delay="0.2s">GitHub</AnimationWrapper></HeroButton>
                    <HeroButton link='#form' handleMenuClick={handleMenuClick}><AnimationWrapper delay="0.3s">Contact</AnimationWrapper></HeroButton>

                    <button onClick={handleMenuClick} className="absolute top-10 right-10 text-black">
                        <X size={30} />
                    </button>
                </ul>,
                document.body
            )}
        </>
    );
}