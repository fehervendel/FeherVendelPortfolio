import {useEffect, useState} from "react";


export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    })

    let cssClasses = "flex justify-center top-0 left-0 fixed w-screen py-4 transition-all duration-300 max-w-full";

    if (scrolled) {
        cssClasses += " bg-white shadow-md backdrop-blur-lg";
    } else {
        cssClasses += ' bg-transparent';
    }

    return (
        <nav className={cssClasses}>
            <div className="container px-8">
                <div>
                    <img alt="logo"/>
                </div>
                <div>
                    <ol className="flex justify-between items-center text-stone-50">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ol>
                </div>
                <div>
                    <ul className="flex justify-between items-center text-stone-50">
                        <li>Linkedin</li>
                        <li>Facebook</li>
                        <li>Email</li>
                    </ul>
                </div>
            </div>

        </nav>
    )
}