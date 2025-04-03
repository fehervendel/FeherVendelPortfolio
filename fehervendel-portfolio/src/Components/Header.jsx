import { useEffect, useState } from "react";
import reactLogo from '../assets/react.svg';
import HeroButton from '../components/HeroButton';
import { Menu, X } from 'lucide-react';
import { createPortal } from "react-dom";
import AnimationWrapper from "./AnimationWrapper.jsx";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            setScrolled(window.scrollY > 50);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let cssClasses = "flex justify-center top-0 left-0 fixed w-screen py-4 transition-all duration-300 max-w-full z-50";

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
                    <div className="lg:w-1/3">
                        <a className="cursor-pointer pointer-events-auto" onClick={handleScrollTop}>
                            <img src={reactLogo} alt="logo" className="w-[55px]" />
                        </a>
                    </div>
                    {isMobile ? (
                        isMenuOpen ? null :
                            <button onClick={handleMenuClick} className='text-black pointer-events-auto'>
                                <Menu size={25} />
                            </button>
                        ) : (
                            <>
                                <div className="md:w-1/2 lg:w-1/3 px-4">
                                    <ol className='flex justify-between items-center'>
                                        <HeroButton link='#hero'>About me</HeroButton>
                                        <HeroButton link='#hero'>Projects</HeroButton>
                                        <HeroButton link='#hero'>GitHub</HeroButton>
                                    </ol>
                                </div>
                                <div className="md:w-1/4 lg:w-1/3">
                                    <ul className='flex justify-end items-center'>
                                        <HeroButton link='#hero'>Contact</HeroButton>
                                    </ul>
                                </div>
                            </>
                        )}
                </div>
            </nav>

            {isMenuOpen && createPortal(
                <ul className="fixed top-0 left-0 w-full h-full bg-black/80 flex flex-col items-center justify-center gap-6 text-white z-50 transition-opacity hamburger-buttons">
                    <HeroButton link='#hero' handleMenuClick={handleMenuClick}><AnimationWrapper >About me</AnimationWrapper></HeroButton>
                    <HeroButton link='#hero' handleMenuClick={handleMenuClick}><AnimationWrapper delay="0.1s">Projects</AnimationWrapper></HeroButton>
                    <HeroButton link='#hero' handleMenuClick={handleMenuClick}><AnimationWrapper delay="0.2s">GitHub</AnimationWrapper></HeroButton>
                    <HeroButton link='#hero' handleMenuClick={handleMenuClick}><AnimationWrapper delay="0.3s">LinkedIn</AnimationWrapper></HeroButton>
                    <HeroButton link='#hero' handleMenuClick={handleMenuClick}><AnimationWrapper delay="0.4s">Email</AnimationWrapper></HeroButton>
                    <HeroButton link='#hero' handleMenuClick={handleMenuClick}><AnimationWrapper delay="0.5s">Phone</AnimationWrapper></HeroButton>

                    <button onClick={handleMenuClick} className="absolute top-10 right-10 text-black">
                        <X size={30} />
                    </button>
                </ul>,
                document.body
            )}
        </>
    );
}