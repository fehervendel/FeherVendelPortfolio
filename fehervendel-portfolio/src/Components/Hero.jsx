import './Hero.css';
/*Animations needed*/
export default function Hero() {
    return (
        <section id='hero' className="flex justify-center bg-transparent">
            <div className="container flex flex-col-reverse lg:flex-row px-8">

                <div className="lg:w-1/2 lg:mt-44 md:pb-20 md:mt-72 sm:mt-96 mt-72
                 pt-36 lg:pt-96">
                    <h1 className="text-stone-50 uppercase font-bold text-center md:text-start pb-52 sm:pb-8  !text-5 md:!text-7xl lg:!text-8xl text-stroke md:whitespace-nowrap">Create <br></br> your <br></br> <span className="whitespace-nowrap">&#123; <span className="colorful">dream</span> &#125;</span> website</h1>
                </div>

                <div className="lg:w-1/2 flex justify-center md:justify-end text-stroke pt-30">
                    <h1 className="text-stone-50 uppercase text-center font-bold !text-6 md:!text-8xl lg:!text-9xl lg:text-end">Vendel Fehér</h1>
                </div>

            </div>
        </section>
    )
}