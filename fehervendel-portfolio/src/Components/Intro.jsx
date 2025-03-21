import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Intro({ setIsWelcome }) {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const t1 = gsap.timeline({
                onComplete: () => {
                    setIsWelcome(false);
                }
            });

            t1.from('#intro-slider', {
                opacity: 0,
                duration: 1.3,
                delay: 0.5,
            }).from(['#title-1', '#dot-1', '#title-2', '#dot-2', '#title-3'], {
                opacity: 0,
                x: '+=300',
                stagger: 0.3
            }).to(['#title-1', '#dot-1', '#title-2', '#dot-2', '#title-3'], {
                opacity: 0,
                x: '-=300',
                delay: 0.2,
                stagger: 0.3
            }).to('#intro-slider', {
                opacity: 0,
                duration: 0.5,
            }).from('#welcome', {
                opacity: 0,
                duration: 1.5,
            }).to('#welcome', {
                scale: 10,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.inOut',
            });
        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp} className="relative w-[100%]">
            <div id="intro-slider" className="h-screen p-10 bg-stone-50 absolute top-0 justify-between left-0 z-10 w-full flex flex-col lg:flex-row items-center tracking-tight overflow-x-hidden">
                <h1 id="title-1" className="!text-9xl font-bold lg:!text-8xl xl:!text-9xl text-black big-shadow uppercase text-center !h-1/3">Code</h1>
                <span id='dot-1' className="xl:pb-40 lg:pb-52 !text-9xl text text-black">&bull;</span>
                <h1 id="title-2" className="!text-9xl font-bold lg:!text-8xl xl:!text-9xl text-black big-shadow uppercase text-center !h-1/3">Flow</h1>
                <span id='dot-2' className="xl:pb-40 lg:pb-52 !text-9xl text text-black">&bull;</span>
                <h1 id="title-3" className="!text-9xl font-bold lg:!text-8xl xl:!text-9xl text-black big-shadow text-nowrap text-center uppercase !h-1/3">Grow</h1>
            </div>
            <div className='h-screen flex justify-center place-items-center overflow-x-hidden'>
                <h1 id="welcome" className="text-7xl sm:!text-9xl text-gray-50 uppercase font-bold neon-shadow">Welcome</h1>
            </div>
        </div>
    );
};