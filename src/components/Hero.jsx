import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {heroVideo, smallHeroVideo} from "../utils/index.js";
import {useEffect, useState} from "react";

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

    const handleVideoScrSet = () => {
        if (window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo)
        } else {
            setVideoSrc(heroVideo)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleVideoScrSet)

        return () => {
            window.removeEventListener('resize', handleVideoScrSet)
        }
    }, []);

    useGSAP(() => {
        gsap.to(".hero-title", {
            opacity: 1,
            delay: 2
        })
        gsap.to("#cta", {
            opacity: 1,
            delay: 2,
            y: -50
        })
    }, [])

    return (
        <section className="w-full nav-height bg-black relative">
            <div className="h-5/6 w-full flex-center flex-col">
                {/*we hide it because we need to animate it*/}
                <p className="hero-title">Iphone 15 Pro</p>

                <div className="md:w-10/12 w-9/12">
                    <video
                        key={videoSrc}
                        className="pointer-events-none"
                        autoPlay
                        muted
                        playsInline={true}
                    >
                        <source src={videoSrc} type="video/mp4"/>
                    </video>
                </div>
            </div>
            {/*we need to animate it from the bottom to the top*/}
            <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
                <a className="btn" href="#highlights">Buy</a>
                <p className="font-normal text-xl">From $199/month ot $999</p>
            </div>
        </section>
    );
};

export default Hero;