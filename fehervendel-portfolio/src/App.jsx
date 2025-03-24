import './App.css';
import Header from '../src/Components/Header.jsx';
import Hero from '../src/Components/Hero.jsx';
import SplineScene from '../src/Components/SplineScene.jsx';
import { useState, useRef, useEffect } from "react";
import Intro from "../src/Components/Intro.jsx";
import AnimationWrapper from "./Components/AnimationWrapper.jsx";

function App() {
    const [isWelcome, setIsWelcome] = useState(true);
    const contentRef = useRef(null);

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
                    <Header/>

                    <div className='w-full'>
                        <SplineScene/>
                        <div className='relative z-10 pointer-events-none'>
                            <Hero/>
                        </div>
                    </div>

                    <div className="container px-8">
                        <AnimationWrapper animationClass='slide-in-bottom' delay='0.2s'>
                            <div>
                                1111111111111
                            </div>
                        </AnimationWrapper>
                        <AnimationWrapper animationClass='slide-in-bottom' delay='0.4s'>
                        <div>
                            2222222222222
                        </div>
                        </AnimationWrapper>
                        <AnimationWrapper animationClass='slide-in-bottom' delay='0.6s'>
                        <div>
                            3333333333333
                        </div>
                        </AnimationWrapper>
                        <div>Ide új tartalom jön</div>
                        <div>Ide új tartalom jön</div>
                        <div>Ide új tartalom jön</div>
                        <div>Ide új tartalom jön</div>
                        <div>Ide új tartalom jön</div>
                        <div>Ide új tartalom jön</div>
                        <div>Ide új tartalom jön</div>
                        <div>Ide új tartalom jön</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
