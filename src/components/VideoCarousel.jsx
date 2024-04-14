import {useEffect, useRef, useState} from 'react';
import {hightlightsSlides} from "../constants/index.js";
import gsap from 'gsap';
import {pauseImg, playImg, replayImg} from "../utils/index.js";
import {useGSAP} from "@gsap/react";

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        videoId: 0,
        isEnd: false,
        startPlay: false,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, setLoadedData] = useState([])

    const {videoId, isEnd, startPlay, isLastVideo, isPlaying} = video;

    useGSAP(() => {
        // slider transform
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut"
        })

        // animate the viideo to play when it is in the view
        gsap.to("#video", {
            // once the video is in view to we want to trigger it
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none"
            },
            onComplete: () => {
                setVideo((prevState) => ({
                    ...prevState,
                    startPlay: true,
                    isPlaying: true
                }))
            }
        })
    }, [isEnd, videoId])

    useEffect(() => {
        if (loadedData.length > 3) {
            // if we are at the end then no longer play the video else if it is true and startPlay also true then play the video
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [isPlaying, loadedData, startPlay, videoId])

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progess = Math.ceil(anim.progress() * 100);
                    if (progess !== currentProgress) {
                        currentProgress = progess;

                        // add width
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? "10vw" : window.innerWidth < 1200 ? "10vw" : "4vw"
                        })
                        // manipulate width depending on video progress
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white"
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        // set width 12px to go back to dot
                        gsap.to(videoDivRef.current[videoId], {
                            width: "12px"
                        })
                        // set default background color
                        gsap.to(span[videoId], {
                            backgroundColor: "#AFAFAF"
                        })
                    }
                }
            })

            if (videoId === 0) {
                anim.restart()
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }

            if (isPlaying) {
                // ticker is used to update progress bar
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }
        }
    }, [videoId, startPlay]);

    const handleLoadedMetaData = (e) => {
        setLoadedData((prevState) => [...prevState, e])
    }

    const handleProcess = (type, index) => {
        switch (type) {
            case "reset":
                setVideo((prevState) => ({
                    ...prevState,
                    isLastVideo: false,
                    videoId: 0
                }))
                break;
            case "play":
                setVideo((prevState) => ({
                    ...prevState,
                    isPlaying: true
                }))
                break;
            case "pause":
                setVideo((prevState) => ({
                    ...prevState,
                    isPlaying: false
                }))
                break;
            case "end":
                setVideo((prevState) => ({
                    ...prevState,
                    isEnd: true,
                    videoId: index++
                }))
                break;
            case "last":
                setVideo((prevState) => ({
                    ...prevState,
                    isLastVideo: true
                }))
                break;
            default:
                return video;
        }
    };
    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, index) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    className={`${list.id === 2 && 'translate-x-4'} pointer-events-none`}
                                    playsInline={true}
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[index] = el)}
                                    onPlay={() => {
                                        setVideo((prevState) => ({
                                            ...prevState,
                                            isPlaying: true
                                        }))
                                    }}
                                    onLoadedMetadata={(e) => handleLoadedMetaData(e, index)}
                                    onEnded={() => index !== 3 ? handleProcess("end", index) : handleProcess("last", index)}
                                >
                                    <source src={list.video} type="video/mp4"/>
                                </video>
                            </div>

                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map(text => (
                                    <p key={text} className="md:text-2xl text-xl font-medium">{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 background-blur rounded-full">
                    {videoRef.current.map((_, index) => (
                        <span
                            key={index}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                            ref={(el) => (videoDivRef.current[index] = el)}
                        >
                            <span
                                className="absolute h-full w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[index] = el)}
                            />
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "Replay" : !isPlaying ? "Play" : "Pause"}
                        onClick={isLastVideo
                            ? () => handleProcess('reset')
                            : !isPlaying
                                ? () => handleProcess('play')
                                : () => handleProcess('pause')
                        }
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;