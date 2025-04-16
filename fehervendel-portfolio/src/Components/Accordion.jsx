import { useState } from "react";

function Accordion({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left py-4 !text-xl font-medium text-stone-100 flex justify-between items-center !bg-transparent focus:!outline-0 hover:!border-stone-50 !ps-0"
            >
                {title}
                <span>{isOpen ? "▲" : "▼"}</span>
            </button>

            <div
                className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="pb-4 pt-2 text-stone-300 text-xl whitespace-pre-wrap">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Accordion;
