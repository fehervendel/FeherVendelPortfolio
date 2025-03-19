import './App.css'
import Header from '../src/Components/Header.jsx';
import Hero from '../src/Components/Hero.jsx';
import SplineScene from '../src/Components/SplineScene.jsx';

function App() {

  return (
    <>
        <div className='z-10 pointer-events-none'>
            <Header />
            <Hero />
        </div>
        <SplineScene />

        <div className="pt-[100vh]">
            <div className='container px-8'>
                <div>Új komponens1</div>
                <div>Új komponens2</div>
            </div>
        </div>

    </>
  )
}

export default App
