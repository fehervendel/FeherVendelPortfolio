import { useInView } from 'react-intersection-observer';

export default function AnimationWrapper({children, animationClass = 'slide-in-bottom', delay = '0s'}) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    return (
        <div
            ref={ref}
            className={`animate opacity-0 ${inView ? animationClass : ''}`}
            style={{animationDelay: delay}}
        >
            {children}
        </div>
    )
}