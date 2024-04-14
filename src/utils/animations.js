import {ScrollTrigger} from "gsap/all";
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: "power2.inOut"
    })

    timeline.to(
        firstTarget,
        {
            ...animationProps,
            ease: "power2.inOut"
        },
        /*insert the animation at the start of the previous one*/
        '<'
    )

    timeline.to(
        secondTarget,
        {
            ...animationProps,
            ease: "power2.inOut"
        },
        '<'
    )
}

export const animateWithGsap = (target, animationProps, scrollProps) => {
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            // toggleActions: enter, leave, enter back, leave back
            toggleActions: "restart reverse restart reverse",
            start: "top 85%",
            ...scrollProps
        }
    })
}