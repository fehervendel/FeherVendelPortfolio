import {useRef, useLayoutEffect, useEffect} from "react";
import gsap from "gsap";
import laptop from "../../public/laptop.jpg";

export default function Intro({ setIsWelcome }) {
    const comp = useRef(null);

    useEffect(() => {
        if (comp.current) {
            let opacity = 0;

            const delayTimeout = setTimeout(() => {
                const interval = setInterval(() => {
                    opacity += 0.03;
                    if (opacity >= 1) {
                        opacity = 1;
                        clearInterval(interval);
                    }
                    comp.current.style.opacity = opacity;
                }, 30);

                return () => clearInterval(interval);
            }, 500);

        }
    }, []);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            const animateStrip = (id, duration, reverse = false) => {
                const strip = document.getElementById(id);
                const width = strip.offsetWidth / 2;

                const fromX = reverse ? -width : 0;
                const toX = reverse ? 0 : -width;

                gsap.fromTo(
                    strip,
                    { x: fromX },
                    {
                        x: toX,
                        duration: duration,
                        ease: "linear",
                        repeat: -1,
                        onRepeat: () => {
                            gsap.set(strip, { x: fromX });
                        },
                    }
                );
            };

            animateStrip("strip-1", 10);
            animateStrip("strip-2", 14, true);
            animateStrip("strip-3", 20);

            gsap.timeline({
                delay: 30,
                onComplete: () => setIsWelcome(false),
            }).to(comp.current, { opacity: 0, duration: 1 });
        }, comp);

        return () => ctx.revert();
    }, []);

    const renderStripImages = () =>
        Array(2)
            .fill(0)
            .flatMap(() => [
                <img key={Math.random()} src={laptop} className="h-full object-cover p-4 rounded-4xl" />,
                <img key={Math.random()} src={laptop} className="h-full object-cover p-4 rounded-4xl" />,
                <img key={Math.random()} src={laptop} className="h-full object-cover p-4 rounded-4xl" />,
                <img key={Math.random()} src={laptop} className="h-full object-cover p-4 rounded-4xl" />,
                <img key={Math.random()} src={laptop} className="h-full object-cover p-4 rounded-4xl" />,
                <img key={Math.random()} src={laptop} className="h-full object-cover p-4 rounded-4xl" />,
            ]);

    return (
        <div ref={comp} className="relative w-full h-screen overflow-hidden opacity-0">
            <button
                onClick={() => setIsWelcome(false)}
                className="absolute top-0 right-4 z-50 !bg-transparent text-white px-4 !py-1 rounded hover:!border-transparent transition"
            >
                Skip >>
            </button>

            {/* Strip 1 */}
            <div className="absolute top-0 left-0 w-full h-1/3 overflow-hidden pt-4">
                <div id="strip-1" className="flex w-max h-full">
                    {renderStripImages()}
                </div>
            </div>

            {/* Strip 2 */}
            <div className="absolute top-1/3 left-0 w-full h-1/3 overflow-hidden">
                <div id="strip-2" className="flex w-max h-full">
                    {renderStripImages()}
                </div>
            </div>

            {/* Strip 3 */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 overflow-hidden pb-4">
                <div id="strip-3" className="flex w-max h-full">
                    {renderStripImages()}
                </div>
            </div>
        </div>
    );
}
