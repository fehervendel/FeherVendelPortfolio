import './App.css'
import Header from '../src/Components/Header.jsx';
import Hero from '../src/Components/Hero.jsx';
import SplineScene from '../src/Components/SplineScene.jsx';

function App() {

    return (
        <>
            <Header/>

            <div className='w-full'>
                <SplineScene/>
                <div className='relative z-10 pointer-events-none'>
                    <Hero/>
                </div>
            </div>

            <div className="container px-8">
                <div>1111111111111</div>
                <div>2222222222222</div>
                <div>3333333333333</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
                <div>Ide új tartalom jön</div>
            </div>

        </>
    )
}

export default App;
