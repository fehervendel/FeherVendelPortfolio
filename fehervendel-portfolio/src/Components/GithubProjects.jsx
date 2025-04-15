import {useState, useEffect, useContext} from 'react';
import { ContentContext } from "./ContentContext.jsx";
import AnimationWrapper from "./AnimationWrapper.jsx";

export default function GithubProjects() {
    const [repos, setRepos] = useState([]);
    const {content}  = useContext(ContentContext);
    let githubProjectsContent = content.filter(item => item.sectionId === "githubProjects").sort((a, b) => a.order - b.order);

    const highlighted = ["FeherVendelPortfolio", "PortfolioBackend", "VisualizeDo"];

    useEffect(() => {
        fetch('https://api.github.com/users/fehervendel/repos')
            .then(res => res.json())
            .then(data => setRepos(data));

    }, []);


    return (
        <div id="githubProjects" className="text-white px-6 pt-12 pb-32">
            <AnimationWrapper delay="0.2s"><h2 className="lg:text-7xl text-6xl font-bold mb-24 text-center">{githubProjectsContent[0].textContent}</h2></AnimationWrapper>
            <AnimationWrapper delay="0.4s">
                <div className="flex justify-center mb-16">
                    <p className="text-xl lg:w-[75%] text-center">
                        {githubProjectsContent[1].textContent}</p>
                </div></AnimationWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos && repos.map((repo, index) => {
                    let cardClass = "bg-[#111] !text-stone-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border flex flex-col h-full";
                    if(highlighted.includes(repo.name)) {
                        cardClass += " hover:border-pink-500 border-sky-400"
                    } else {
                        cardClass += " hover:border-white/80 border-white/30"
                    }
                    return(
                    <AnimationWrapper delay={`${index * 0.15 + 0.2}s`}>
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={repo.id}
                            className={cardClass}
                        >
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
                                <p className="text-sm text-white/70 mb-4">
                                    {repo.description || "No description"}
                                </p>
                            </div>
                            <p className="mt-auto text-sm text-blue-400 hover:text-blue-300 transition">
                                Go to repository →
                            </p>
                        </a>
                    </AnimationWrapper>
                )})}
            </div>
        </div>
    )
}
