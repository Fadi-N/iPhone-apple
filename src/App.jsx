import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Highlights from "./components/Highlights.jsx";
import VideoCarousel from "./components/VideoCarousel.jsx";

const App = () => {
    return (
        <main className="bg-black">
            <Navbar/>
            <Hero/>
            <Highlights/>
            <VideoCarousel/>
        </main>
    )
}

export default App
