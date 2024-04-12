import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {rightImg, watchImg} from "../utils/index.js";

const Highlights = () => {
    useGSAP(() => {
        gsap.to("#title", {
            opacity: 1,
            y: 0
        })
        gsap.to(".link",{
            opacity: 1,
            y:0,
            duration: 1,
            stagger: 0.25
        })
    }, [])

    return (
        <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
            <div className="screen-max-width">
                <div className="mb-12 w-full md:flex items-end justify-between">
                    {/*We need to show this heading*/}
                    <h1 id="title" className="section-heading">Get the highlights.</h1>
                    <div className="flex flex-wrap items-end gap-5">
                        <p className="link">
                            <span>Watch the film</span>
                            <img src={watchImg} alt="watch" className="ml-2"/>
                        </p>
                        <p className="link">
                            <span>Watch the event</span>
                            <img src={rightImg} alt="right" className="ml-2"/>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;