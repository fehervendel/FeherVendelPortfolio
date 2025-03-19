import './App.css'
import Header from '../src/Components/Header.jsx';
import Hero from '../src/Components/Hero.jsx';
import SplineScene from '../src/Components/SplineScene.jsx';

function App() {

    return (
        <>
            <div className="relative h-[100vh]">
                <div className='z-10 relative pointer-events-none max-w-full'>
                    <Header/>
                    <Hero/>
                </div>
                <SplineScene/>
            </div>

            <div className="container px-8">
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
            </div>
        </>
    )
}

export default App;
