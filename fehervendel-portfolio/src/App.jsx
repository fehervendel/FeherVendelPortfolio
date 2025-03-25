import './App.css';
import Header from '../src/Components/Header.jsx';
import Hero from '../src/Components/Hero.jsx';
import SplineScene from '../src/Components/SplineScene.jsx';
import { useState, useRef, useEffect } from "react";
import Intro from "../src/Components/Intro.jsx";
import AnimationWrapper from "./Components/AnimationWrapper.jsx";
import Card from "../src/components/Card.jsx";
import {useInView} from "react-intersection-observer";

function App() {
    const [isWelcome, setIsWelcome] = useState(true);
    const contentRef = useRef(null);

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.7
    });

    useEffect(() => {
        if (!isWelcome && contentRef.current) {
            let opacity = 0;

            const delayTimeout = setTimeout(() => {
                const interval = setInterval(() => {
                    opacity += 0.05;
                    if (opacity >= 1) {
                        opacity = 1;
                        clearInterval(interval);
                    }
                    contentRef.current.style.opacity = opacity;
                }, 30);

                return () => clearInterval(interval);
            }, 1000);

            return () => clearTimeout(delayTimeout);
        }
    }, [isWelcome]);

    return (
        <>
            {isWelcome ? (
                <Intro setIsWelcome={setIsWelcome} />
            ) : (
                <div id="main-content" ref={contentRef} style={{ opacity: 0 }}>
                    { inView && <div id="bg-blur" className="backdrop-blur-lg blur-animation"></div>}
                    <Header/>

                    <div className='w-full'>
                        <SplineScene/>
                        <div className='relative pointer-events-none'>
                            <Hero/>
                        </div>
                    </div>

                    <div className="container px-8">


                        <div className="stack-area w-full h-[300vh] flex flex-col lg:flex-row">
                            <div className="left lg:basis-[50%] flex flex-col lg:justify-center lg:h-screen text-stone-50 pe-16">
                                <AnimationWrapper delay='0.3s'>
                                    <h2 className="text-7xl uppercase font-bold pb-16">About me</h2>
                                </AnimationWrapper>
                                <AnimationWrapper delay='0.5s'>
                                    <p className="text-xl pb-16">Description description description description description description description <br/>description description description</p>
                                </AnimationWrapper>
                                <AnimationWrapper delay='0.7s'>
                                    <button className="!text-xl text-stone-950 hover:!bg-stone-950 hover:text-stone-50 hover:!border-stone-50 text-nowrap">Contact me</button>
                                </AnimationWrapper>
                            </div>
                            <div ref={ref} className="right lg:basis-[50%] h-screen relative z-10">
                                <Card
                                    color="bg-amber-400"
                                    title='React'
                                    shortDescription={"My favorite frontend javascript framework. This page is also designed with React."}/>

                                <Card
                                    color="bg-[#f13e78]"
                                    title='React'
                                    shortDescription={"My favorite frontend javascript framework. This page is also designed with React."}/>

                                <Card
                                    color="bg-[#585cfd]"
                                    title='React'
                                    shortDescription={"My favorite frontend javascript framework. This page is also designed with React."}/>

                                <Card
                                    color="bg-[#c2d834]"
                                    title='React'
                                    shortDescription={"My favorite frontend javascript framework. This page is also designed with React."}/>
                            </div>
                        </div>


                        <div className="text-stone-50 h-[100vh] pt-8"><p>NEXT CONTENT</p></div>
                    </div>
                </div>

            )}
        </>
    );
}

export default App;
