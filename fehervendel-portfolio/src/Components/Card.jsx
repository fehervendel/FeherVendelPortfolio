import { useEffect } from "react";

export default function Card({ title, shortDescription, color = 'white' }) {

    useEffect(() => {
        function rotateCards() {
            let angle = 0;
            const cards = document.querySelectorAll('.card');

            cards.forEach((card, index) => {
                if (card.classList.contains('away')) {
                    card.style.transform = `translateY(-120vh) rotate(-48deg)`;
                } else {
                    card.style.transform = `rotate(${angle}deg)`;
                    angle -= 10;
                    card.style.zIndex = cards.length - index;
                }
            });
        }

        function handleScroll() {
            let stackArea = document.querySelector('.stack-area');
            if (!stackArea) return;

            let distance = window.innerHeight / 2;
            let topVal = stackArea.getBoundingClientRect().top;
            let index = Math.floor(-1 * (topVal / distance + 1));

            document.querySelectorAll('.card').forEach((card, i) => {
                if (i <= index) {
                    card.classList.add('away');
                } else {
                    card.classList.remove('away');
                }
            });

            rotateCards();
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    let style = "card sm:w-[350px] w-[250px] sm:h-[350px] h-[250px] rounded-2xl !p-6 sm:!p-8  flex flex-col justify-between absolute custom-card-position";

    return (
        <div className={style} style={{ backgroundColor: color }}>
            <h3 className='text-stone-950 uppercase font-bold text-4xl custom-line-height'>{title}</h3>
            <p className='text-stone-950 sm:text-2xl font-medium'>{shortDescription}</p>
        </div>
    );
}
