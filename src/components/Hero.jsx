
import data from '../data/portfolio.json';
import { FiDownload, FiEye } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import Button from './common/Button';
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaFacebook,
} from 'react-icons/fa';
const Hero = () => {
    const { hero, socialLinks } = data;
    const socialIcons = {
        github: FaGithub,
        linkedin: FaLinkedin,
        twitter: FaTwitter,
        instagram: FaInstagram,
        facebook: FaFacebook,
    };

    return (
        <section id="home" className="section section-hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <p className="hero-welcome animate-fade-in-up">Welcome!</p>
                        <h1 className="hero-name animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            I'm <span>{hero?.name || 'John Doe'}</span>
                        </h1>
                        <h3 className="hero-designation animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {hero?.designation || 'Full Stack Developer'}
                        </h3>
                        <p className="hero-description animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            {hero?.description || ''}
                        </p>
                        <div className="hero-buttons animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <Button href="#contact" variant="primary" icon={<HiOutlineMail />}>
                                Hire Me
                            </Button>
                            <Button href="/uploads/resume.pdf" variant="outline" icon={<FiDownload />}>
                                Resume
                            </Button>
                            <Button href="#projects" variant="outline" icon={<FiEye />}>
                                Projects
                            </Button>
                        </div>
                        <div className="hero-social animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            {socialLinks &&
                                Object.entries(socialLinks).map(([key, url]) => {
                                    const Icon = socialIcons[key];
                                    return Icon ? (
                                        <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                                            <Icon />
                                        </a>
                                    ) : null;
                                })}
                        </div>
                    </div>
                    <div className="col-lg-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="hero-image-wrap hero-image animate-float">
                            <img src={hero?.image} alt={hero?.name || 'Hero'} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
