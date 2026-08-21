import { useEffect, useRef } from 'react';
import Hero from '../../components/Hero';
import Statistics from '../../components/Statistics';
import About from '../../components/About';
import Skills from '../../components/Skills';
import Services from '../../components/Services';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import Certificate from '../../components/Certificate';
import Projects from '../../components/Projects';
// import Testimonials from '../../components/Testimonials';
import Pricing from '../../components/Pricing';
// import Resume from '../../components/Resume';
import Contact from '../../components/Contact';
import CTA from '../../components/CTA';
import FabButtons from '../../components/FabButtons';

const Home = () => {
    const cardRefs = useRef([]);
    // 3D card mouse effect
    useEffect(() => {
        const cards = cardRefs.current;
        const handleMouseMove = (e, el) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 4;
            const rotateY = ((x - centerX) / centerX) * 4;
            el.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        };
        const handleMouseLeave = (el) => {
            el.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
        };

        cards.forEach((el) => {
            if (el) {
                el.addEventListener('mousemove', (e) => handleMouseMove(e, el));
                el.addEventListener('mouseleave', () => handleMouseLeave(el));
            }
        });

        return () => {
            cards.forEach((el) => {
                if (el) {
                    el.removeEventListener('mousemove', (e) => handleMouseMove(e, el));
                    el.removeEventListener('mouseleave', () => handleMouseLeave(el));
                }
            });
        };
    }, []);

    return (
        <>
            <Hero />
            {/* <Statistics /> */}
            <About />
            <Skills />
            {/* <Services /> */}
            <Experience />
            <Education />
            {/* <Certificate /> */}
            <Projects />
            {/* <Testimonials /> */}
            {/* <Pricing /> */}
            {/* <Resume /> */}
            <Contact />
            {/* <CTA /> */}
            <FabButtons />
        </>
    );
};

export default Home;