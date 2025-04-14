import '../App.css';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import SplineScene from './SplineScene.jsx';
import {useState, useRef, useEffect, useContext} from "react";
import Intro from "./Intro.jsx";
import AnimationWrapper from "./AnimationWrapper.jsx";
import Card from "./Card.jsx";
import {useInView} from "react-intersection-observer";
import Form from "./Form.jsx";
import GithubProjects from "./GithubProjects.jsx";
import Footer from "./Footer.jsx";
import { ContentContext } from "./ContentContext.jsx";

function HomePage() {
    const [isWelcome, setIsWelcome] = useState(true);
    const contentRef = useRef(null);
    const [cards, setCards] = useState([]);
    const {content}  = useContext(ContentContext);
    let aboutMeContent = content.filter(item => item.sectionId === "aboutMe").sort((a, b) => a.order - b.order);

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.7
    });

    const fetchCards = async () => {
        try {
            const response = await fetch("https://localhost:7217/Card/GetCards", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })

            const jsonData = await response.json();
            setCards(jsonData);
        } catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchCards();
    }, [])


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
                <div id="main-content" className="max-w-full" ref={contentRef} style={{ opacity: 0 }}>
                    { inView && <div id="bg-blur" className="backdrop-blur-lg blur-animation"></div>}
                    <Header/>

                    <div className='w-full max-w-full'>
                        <SplineScene/>
                        <div className='relative pointer-events-none'>
                            <Hero/>
                        </div>
                    </div>

                    <div className="container px-8">


                        <div className={`stack-area w-full flex flex-col lg:flex-row`} style={{height: `${100 + 50 * cards.length}vh`}}>
                            <div className="left lg:basis-[50%] flex flex-col lg:justify-center lg:h-screen text-stone-50 lg:pe-16">
                                <AnimationWrapper delay='0.3s'>
                                    <h2 id="aboutMe" className="text-7xl uppercase font-bold pb-16">{aboutMeContent[0].textContent}</h2>
                                </AnimationWrapper>
                                <AnimationWrapper delay='0.5s'>
                                    <p className="text-xl pb-16 whitespace-pre-wrap">{aboutMeContent[1].textContent}</p>
                                </AnimationWrapper>
                                <AnimationWrapper delay='0.7s'>
                                    <button className="!text-xl !text-stone-950 !bg-stone-50 hover:!bg-stone-950 hover:!text-stone-50 hover:!border-stone-50 text-nowrap">Contact me</button>
                                </AnimationWrapper>
                            </div>
                            <div ref={ref} className="right lg:basis-[50%] h-screen relative z-10">
                                {cards && cards.sort((a, b) => a.order - b.order).map(card => (
                                    <Card key={card.id} color={card.color} title={card.title} shortDescription={card.description} />
                                ))}
                            </div>
                        </div>

                        <div className="text-stone-50 pt-32 lg:pt-8 lg:pb-32"><GithubProjects/></div>
                        <div className="text-stone-50 pt-8 pb-16"><Form/></div>
                        <div className="text-stone-50 pt-8"><Footer/></div>

                    </div>
                </div>
            )}
        </>
    );
}

export default HomePage;